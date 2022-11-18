import { parse } from "csv-parse/sync";
import { readFileSync } from "node:fs";
import * as path from "path";
import { ArrowFunction, FunctionDeclaration, FunctionExpression, Identifier,
         Node, ParameterDeclaration, Project, SourceFile, SyntaxKind, VariableDeclaration,
         VariableStatement } from "ts-morph";

interface CSVRecord {
    startLine: number;
    startCol: number;
    endLine: number;
    endCol: number;
    typePrediction: string;
}

/**
 * This class parses the CSV file into an array. Then, to make lookup easier,
 * the array is converted into a map from source locations (encoded as the
 * string `{startLine}-{startCol}`) to type predictions (strings).
 */
class TypePredictions {
    private readonly debug: boolean;
    private readonly lookupTable: Record<string,string>;

    // Read and parse CSV file, which contains tokens and the probability distribution of
    // predicted types.
    constructor(filename: string, debug: boolean = false) {
        this.debug = debug
        const contents: Buffer = readFileSync(filename);
        const records: CSVRecord[] = parse(contents, {
            // The columns are:
            //   start_line, start_pos, end_line, end_pos, type1, prob1, ...
            columns: ["startLine", "startCol", "endLine", "endCol", "typePrediction"],
            quote: false,
            relax_column_count_more: true,
            trim: true
        });

        // Convert array of predictions to a lookup table
        let lookupTable: Record<string,string> = {}
        for (const r of records) {
            const key: string = `${r.startLine}-${r.startCol}`;
            // LambdaNet infers Number, String, Boolean, and Object, but these
            // really should be number, string, boolean, and object.
            // See: https://www.typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html#number-string-boolean-symbol-and-object
            // Also, Array is a generic type and must be given a type argument,
            // so we replace it with any[].
            // TODO: maybe this should be configurable with a flag
            switch (r.typePrediction) {
                case "Number":
                case "String":
                case "Boolean":
                case "Object":
                    lookupTable[key] = r.typePrediction.toLowerCase();
                    break;
                case "Array":
                    lookupTable[key] = "any[]";
                    break;
                default:
                    lookupTable[key] = r.typePrediction;
            }
        }
        this.lookupTable = lookupTable;

        if (this.debug) {
            this.debugPrint();
        }
    }

    /**
     * Given a source file and AST node, look up and return the node's type prediction.
     * The source file is needed to get the node's source location information;
     * furthermore, the source location (given as a character offset into the file)
     * must be converted into line and column numbers, then encoded as a string for
     * lookup in the map.
     *
     * @param {SourceFile} sourcefile The source file that the AST node is from.
     * @param {Node} node The AST node to look up a type prediction for.
     * @return {string | undefined} The type prediction for the given AST node,
     *  or undefined if no prediction is available.
     */
    public lookup(sourceFile: SourceFile, node: Node): string | undefined {
        const { line, column } = sourceFile.getLineAndColumnAtPos(node.getStart());
        const key: string = `${line}-${column}`;
        if (this.debug) {
            console.log(`${node.getStart()} ${line},${column}: ${node.getText()}`);
        }
        return this.lookupTable[key];
    }

    private debugPrint(): void {
        for (const key in this.lookupTable) {
            console.log(`${key} => ${this.lookupTable[key]}`);
        }
    }
}

export default class LambdaNet {
    private readonly debug: boolean;
    private readonly predictions: TypePredictions;

    private readonly project: Project;
    private outputFile: SourceFile;

    private nodeToPrediction: Map<Node,string> = new Map();

    constructor(jsFilename: string, csvFilename: string, debug: boolean = false) {
        this.debug = debug;

        // Read and parse unannotated JavaScript source.
        // Prepare TypeScript output file by copying JS file.
        this.project = new Project();
        const sourceFile: SourceFile = this.project.addSourceFileAtPath(jsFilename);
        this.outputFile = sourceFile.copy(path.parse(jsFilename).name + ".ts", { overwrite: true });
        this.predictions = new TypePredictions(csvFilename, debug);
    }

    /**
    * This function traverses the AST, querying the CSV records with a source location
    * to get the predicted types for those tokens. However, it cannot set the type
    * annotation, because that modifies the source locations for every subsequent node.
    * Instead, we cache the node and its predicted type in a separate map, and run
    * a second pass to set the types.
    *
    * The nodes we can annotate are:
    *   - variable declarations
    *   - function declarations
    *   - function expressions
    *   - arrow functions
    *
    * Variable declarations must not be in for...in or for...of statements
    *   e.g. for (var x in/of y) { ... }
    * and must not be used in destructuring assignments
    *   e.g. let [a, b] = c
    */
    private traverse = (node: Node): void => {
        /**
         * Local function for looking up the type prediction for a node, and then
         * caching it in a map so the node's type can be set in a second pass.
         *
         * Note that for function-like nodes, the node to look up and the node to be
         * typed are different: the node to look up is the identifier (name) of the
         * function, while the node to be typed is the actual function node. The
         * source locations for the two are different. For other kinds of nodes, the
         * two are the same.
         *
         * @param {Node} nodeToLookup The node whose type prediction we want to look up.
         * @param {Node} nodeToType The node to have its type annotation set; defaults to `nodeToLookup`.
         */
        const lookupAndCache = (nodeToLookup: Node, nodeToType: Node = nodeToLookup): void => {
            const prediction: string | undefined = this.predictions.lookup(this.outputFile, nodeToLookup);
            if (prediction) {
                if (this.debug) {
                    console.log(`\t${nodeToType.getText().replace(/\s+/g, " ").slice(0, 80)}: ${prediction}`);
                }
                this.nodeToPrediction.set(nodeToType, prediction);
            }
        }

        /**
        * Local function for handling function nodes, i.e. function expressions
        * and function declarations. Doesn't handle arrow functions, because those
        * have no return type annotations.
        *
        * Lookup and set the return type.
        */
        const handleFunction = (funNode: FunctionDeclaration | FunctionExpression): void => {
            if (funNode.getNameNode()) {
                const funId: Identifier = funNode.getNameNodeOrThrow();
                lookupAndCache(funId, funNode);
            }
        };

        /**
        * Local function for handling function parameters, i.e. parameters of
        * function expressions, function declarations, and arrow nodes.
        * Skip if the parameter is a destructuring pattern.
        *
        * Otherwise, lookup and set the parameter type.
        */
        const handleParams = (funNode: FunctionDeclaration | FunctionExpression | ArrowFunction): void => {
            for (const p of funNode.getParameters()) {
                if (!p.getChildAtIndexIfKind(0, SyntaxKind.Identifier)) {
                    return;
                }
                lookupAndCache(p);
            }
        };

        switch (node.getKind()) {
            case SyntaxKind.VariableDeclaration: {
                /**
                 * Example: let x = 42
                 * Result: let x: T = 42
                 */
                const varDecl: VariableDeclaration = node.asKindOrThrow(SyntaxKind.VariableDeclaration);
                const varStmt: VariableStatement | undefined = varDecl
                    .getParentOrThrow()
                    .getParentIfKind(SyntaxKind.VariableStatement);
                const idNode: Identifier | undefined = varDecl.getChildAtIndexIfKind(0, SyntaxKind.Identifier);

                // Skip this case if any of the following are true:
                //   - grandparent node is not a variable statement (meaning we're in a for loop)
                //   - first child node is not an identifier (meaning we have a destructuring pattern)
                if (!varStmt || !idNode) {
                    break;
                }
                lookupAndCache(varDecl);
                break;
            }
            case SyntaxKind.FunctionDeclaration: {
                /**
                 * Example: function f(a, b) { ... }
                 * Results: function f(a: T2, b: T3): T1 { ... }
                 */
                const funDecl: FunctionDeclaration = node.asKindOrThrow(SyntaxKind.FunctionDeclaration);
                handleFunction(funDecl);
                handleParams(funDecl);
                break;
            }
            case SyntaxKind.FunctionExpression: {
                /**
                 * Example: function(a, b, c) { ... }
                 * Result: function(a: T1, b: T2, c: T3) { ... }
                 */
                const funExpr: FunctionExpression = node.asKindOrThrow(SyntaxKind.FunctionExpression);
                handleFunction(funExpr);
                handleParams(funExpr);
                break;
            }
            case SyntaxKind.ArrowFunction: {
                /**
                 * Example: (a, b) => a + b
                 * Result: (a: T1, b: T2) => a + b
                 */
                const arrowFun: ArrowFunction = node.asKindOrThrow(SyntaxKind.ArrowFunction);
                handleParams(arrowFun);
                break;
            }
        }
        node.forEachChild(this.traverse);
    }

    public run() {
        // Pass 1: traverse the AST and look up type predictions for nodes that can be typed.
        // This pass also caches the type predictions in a map of nodes to type predictions.
        this.traverse(this.outputFile);

        // Pass 2: apply the type predictions. We need to do a pattern match to cast the
        // nodes to the right type, in order to set their type annotations. Specifically,
        // function nodes use the `setReturnType` method, while other nodes use `setType`.
        for (const [node, prediction] of this.nodeToPrediction) {
            switch (node.getKind()) {
                case SyntaxKind.FunctionDeclaration:
                    node.asKindOrThrow(SyntaxKind.FunctionDeclaration).setReturnType(prediction);
                    break;
                case SyntaxKind.FunctionExpression:
                    node.asKindOrThrow(SyntaxKind.FunctionExpression).setReturnType(prediction);
                    break;
                case SyntaxKind.Parameter:
                    node.asKindOrThrow(SyntaxKind.Parameter).setType(prediction);
                    break;
                case SyntaxKind.VariableDeclaration:
                    node.asKindOrThrow(SyntaxKind.VariableDeclaration).setType(prediction);
                    break;
            }
        }

        if (this.debug) {
            // Print annotated code to console
            console.log(this.outputFile.getFullText());
        }

        // Save the modified file
        this.outputFile.saveSync();
    }
}
