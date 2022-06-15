import { existsSync, readFileSync } from "node:fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import { ArrowFunction, FunctionDeclaration, FunctionExpression, Identifier,
         ParameterDeclaration, Project, SourceFile, SyntaxKind, VariableDeclaration,
         VariableDeclarationKind, VariableStatement } from "ts-morph";

function printUsageAndExit(error: string): void {
    console.log(error);
    console.log("Usage: node index.js <file.js>");
    console.log("  file.js is expected to be a JavaScript file (without type annotations)");
    console.log("  file.csv must also exist, and contains the predicted types for input.js");
    console.log("Outputs: file.ts");
    process.exit(1);
}

if (process.argv.length != 3) {
    printUsageAndExit("No input file provided.");
}

const jsFilename: string = process.argv[2];
const jsPath: path.ParsedPath = path.parse(jsFilename);
const csvFilename: string = path.join(jsPath.dir, jsPath.name + ".csv");

if (!existsSync(jsFilename)) {
    printUsageAndExit("File does not exist: " + jsFilename);
} else if (!existsSync(csvFilename)) {
    printUsageAndExit("File does not exist: " + csvFilename);
}

// Read and parse unannotated JavaScript source.
// Prepare TypeScript output file by copying JS file.
const project: Project = new Project();
const sourceFile: SourceFile = project.addSourceFileAtPath(jsFilename);
let outputFile: SourceFile = sourceFile.copy(jsPath.name + ".ts", { overwrite: true });

interface Record {
    tokenValue: string;
    tokenType: string;
    typePrediction: string;
    typeProbability: number;
}

/**
 * This class parses the CSV file and maintains an array of type predictions.
 * However, the sequence of predictions does not directly correspond to the declarations
 * encountered in an AST traversal of the program. Therefore, the tree traversal
 * will query this class and ask for the predictions for the given identifiers.
 */
class TypePredictions {
    private readonly debug: boolean;
    readonly records: Record[];
    // Internal index into the records array, used for searching.
    private index: number = 0;

    // Read and parse CSV file, which contains tokens and the probability distribution of
    // predicted types.
    constructor(filename: string, debug: boolean = false) {
        this.debug = debug
        const contents: Buffer = readFileSync(filename);
        this.records = parse(contents, {
            // DeepTyper uses \x1f, the ASCII control character "Unit Separator"
            delimiter: "\x1f",
            // The columns are:
            //   token_val, token_type, type1, prob1, ...
            on_record: function (record, _) {
                const tokVal = record[0];
                const tokType = record[1];
                // Only take tokens that are names or keywords (since they might be identifiers).
                // Also keep "=>" tokens, to use for searching arrow functions.
                if (tokType.startsWith("Name") || tokType.startsWith("Keyword") || tokVal === "=>") {
                    return {
                        tokenValue: tokVal,
                        tokenType: tokType,
                        typePrediction: record[2],
                        typeProbability: record[3],
                    }
                } else {
                    return null;
                }
            },
            quote: false,
            relax_column_count: true,
            trim: true
        });
    }

    /**
     * Searches the CSV records to get type predictions for the given token sequence.
     * The assumption is that a given token sequence (for a declaration) is reasonably unique;
     * if not, then the order it appears in the CSV records is the same order encountered
     * while traversing the AST.
     *
     * @param {string[]} tokens The sequence of tokens to search for type predictions.
     * @return {string[]} Array of types corresponding to tokens.
     */
    findTypesForTokens(tokens: string[]): string[] {
        const n: number = this.records.length;
        const m: number = tokens.length;

        // Start the search from the current index.
        for (let i = this.index; i <= n - m; ++i) {
            let match: boolean = true;
            let j: number = 0;
            while (j < m && match) {
                if (this.records[i + j].tokenValue === tokens[j]) {
                    j++;
                } else {
                    match = false;
                }
            }
            if (match) {
                // Check that the previous token is not "for",
                // but only if there is a previous token (i.e. current token is not the first).
                if (i > 0 && this.records[i - 1].tokenValue === "for") {
                    continue;
                }
                const entries: Record[] = this.records.slice(i, i + m);
                const predictions: string[] = entries.map(_ => _.typePrediction);

                // Update the index, so that search resumes from this point instead
                // of starting from the beginning.
                this.index = i;

                if (this.debug) {
                    console.log(tokens);
                    console.log(predictions);
                    console.log(entries);
                }
                return predictions;
            }
        }
        // If we reach this point, we couldn't find anything in the CSV file,
        // which is probably an error. Let the caller handle it.
        return undefined;
    }

    debugPrint(): void {
        for (const r of this.records) {
            if (r.typePrediction) {
                console.log(r.tokenValue + " (" + r.tokenType + "): " + r.typePrediction);
            } else {
                console.log(r.tokenValue + " (" + r.tokenType + ")");
            }
        }
    }
}

const predictions: TypePredictions = new TypePredictions(csvFilename);

/**
 * This function iterates the AST, querying the CSV records with a token sequence
 * to get the predicted types for those tokens. It then sets the type annotations
 * for those AST nodes.
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
function traverse(node: SourceFile): void {
    /**
     * Local function for handling function-like nodes, i.e. function expressions,
     * function declarations, and arrow nodes. Checks if the function parameters
     * have destructuring patterns or are optional (i.e. default); if so, skip.
     *
     * Otherwise, search for type predictions (and handle the case where the search
     * fails), and pass the type predictions to the callback.
     */
    function handleFunction(funNode: FunctionDeclaration | FunctionExpression | ArrowFunction,
                            params: ParameterDeclaration[],
                            tokens: string[],
                            callback: (types: string[]) => void): void {
        if (!params.every(_ => _.getChildAtIndexIfKind(0, SyntaxKind.Identifier))) {
            // Silently skip destructuring patterns in params
            return;
        }

        if (params.some(_ => _.isOptional())) {
            console.error("Found optional parameters; skipping function.");
            console.error("\t" + funNode.getText().replace(/\s+/g, " ").slice(0, 80));
            return;
        }

        const types: string[] = predictions.findTypesForTokens(tokens);
        if (!types) {
            console.error("Searching for types failed on tokens: " + tokens.join(" "));
            return;
        }

        callback(types);
    }

    switch (node.getKind()) {
        case SyntaxKind.VariableDeclaration: {
            /**
             * Example: let x = 42
             * Token sequence: [let, x]
             * Result: let x: T = 42
            */
            const varDecl: VariableDeclaration = node.asKindOrThrow(SyntaxKind.VariableDeclaration);
            const varStmt: VariableStatement = varDecl
                .getParentOrThrow()
                .getParentIfKind(SyntaxKind.VariableStatement);
            const idNode: Identifier = varDecl.getChildAtIndexIfKind(0, SyntaxKind.Identifier);

            // Skip this case if any of the following are true
            //   - grandparent node is not a variable statement (meaning we're in a for loop)
            //   - first child node is not an identifier (meaning we have a destructuring pattern)
            //   - this is not the first declaration in a statement
            //     - the search algorithm does not handle this case, so we ignore it.
            if (!varStmt || !idNode) {
                break;
            } else if (varStmt.getDeclarations()[0] !== varDecl) {
                console.error("Found multiple declarations; skipping rest of declarations.");
                console.error("\t" + varStmt.getText().replace(/\s+/g, " ").slice(0, 80));
                break;
            }

            const varDeclType: VariableDeclarationKind = varStmt.getDeclarationKind();
            const identifier: string = idNode.getText();

            const tokens: string[] = [varDeclType, identifier];
            const types: string[] = predictions.findTypesForTokens(tokens);
            if (!types) {
                console.error("Searching for types failed on tokens: " + tokens.join(" "));
                break;
            }

            // Discard the "undefined" prediction for the let/const/var token
            const [_, varType]: string[] = types;
            if (varType) {
                varDecl.setType(varType);
            }
            break;
        }
        case SyntaxKind.FunctionDeclaration: {
            /**
             * Example: function f(a, b) { ... }
             * Token sequence: [function, f, a, b]
             * Result: function f(a: T2, b: T3): T1 { ... }
            */
            const funDecl: FunctionDeclaration = node.asKindOrThrow(SyntaxKind.FunctionDeclaration);
            const funName: string = funDecl.getName();
            const params: ParameterDeclaration[] = funDecl.getParameters();
            const paramNames: string[] = params.map(_ => _.getName());

            const tokens: string[] = ["function", funName].concat(paramNames);

            handleFunction(funDecl, params, tokens, function(types: string[]) {
                // Discard the "undefined" prediction for the "function" token
                const [_, retType, ...paramTypes]: string[] = types;
                if (retType) {
                    funDecl.setReturnType(retType);
                }
                params.forEach((p, i) => {
                    if (paramTypes[i]) {
                        p.setType(paramTypes[i]);
                    }
                });
            });
            break;
        }
        case SyntaxKind.FunctionExpression: {
            /**
             * Example: function(a, b, c) { ... }
             * Token sequence: [function, a, b, c]
             * Result: function(a: T1, b: T2, c: T3) { ... }
            */
            const funExpr: FunctionExpression = node.asKindOrThrow(SyntaxKind.FunctionExpression);
            const funName: string = funExpr.getName();
            const params: ParameterDeclaration[] = funExpr.getParameters();
            const paramNames: string[] = params.map(_ => _.getName());

            // funName is optional, so filter it out if it's undefined.
            const tokens: string[] = ["function", funName].concat(paramNames).filter(_ => _);

            handleFunction(funExpr, params, tokens, function(types: string[]) {
                // Discard the "undefined" prediction for the "function" token
                types.shift();
                if (funName) {
                    const retType: string = types.shift();
                    if (retType) {
                        funExpr.setReturnType(retType);
                    }
                }
                params.forEach((p, i) => {
                    if (types[i]) {
                        p.setType(types[i]);
                    }
                });
            });
            break;
        }
        case SyntaxKind.ArrowFunction: {
            /**
             * Example: (a, b) => a + b
             * Token sequence: [a, b, =>]
             * Result: (a: T1, b: T2) => a + b
            */
            const arrowFun: ArrowFunction = node.asKindOrThrow(SyntaxKind.ArrowFunction);
            const params: ParameterDeclaration[] = arrowFun.getParameters();
            const paramNames: string[] = params.map(_ => _.getName());

            const tokens: string[] = paramNames.concat(["=>"])

            handleFunction(arrowFun, params, tokens, function(types: string[]) {
                // Discard the "undefined" prediction for "=>"
                types.pop();
                params.forEach((p, i) => {
                    if (types[i]) {
                        p.setType(types[i]);
                    }
                });
            });
            break;
        }
    }
    node.forEachChild(traverse);
}
traverse(outputFile);

// Print annotated code to console
//predictions.debugPrint();
//console.log(outputFile.getFullText());

// Save the modified file
outputFile.saveSync();
