import { existsSync, readFileSync } from "node:fs";
import * as path from "path";
import { parse } from "csv-parse/sync";
import { Project, SourceFile, SyntaxKind } from "ts-morph";

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
    constructor(filename: string, debug = false) {
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
        // which is probably an error.
        throw "Searching CSV records failed!"
    }

    debugPrint(): void {
        for (let r of this.records) {
            if (r.typePrediction) {
                console.log(r.tokenValue + " (" + r.tokenType + "): " + r.typePrediction);
            } else {
                console.log(r.tokenValue + " (" + r.tokenType + ")");
            }
        }
    }
}

const records: TypePredictions = new TypePredictions(csvFilename);

/**
 * This function iterates the AST, querying the CSV records with a token sequence
 * to get the predicted types for those tokens. It then sets the type annotations
 * for those AST nodes.
 *
 * Specifically:
 *   - variable declarations
 *       e.g. let x = 42 ...
 *       query: [let, x]
 *       types: [T1]
 *       rewriting: let x: T1 = 42 ...
 *   - function declarations
 *       e.g. function f(a, b) { ... }
 *       query: [function, f, a, b]
 *       types: [undefined, T, S1, S2]
 *       rewriting: function f(a: S1, b: S2): T { ... }
 *   - function expressions
 *       e.g. function(a, b, c) { ... }
 *       query: [function, a, b, c]
 *       types: [undefined, T1, T2, T3]
 *       rewriting: function(a: T1, b: T2, c: T3) { ... }
 *   - arrow functions
 *       e.g. (a, b) => a + b
 *       query: [a, b, =>]
 *       types: [T1, T2, undefined]
 *       rewriting: (a: T1, b: T2) => a + b
 *
 * Variable declarations must not be in for...in or for...of statements
 *   e.g. for (var x in/of y) { ... }
 * and must not be used in destructuring assignments
 *   e.g. let [a, b] = c
 */
function traverse(node: SourceFile): void {
    switch (node.getKind()) {
        case SyntaxKind.VariableDeclaration: {
            const varDecl = node.asKindOrThrow(SyntaxKind.VariableDeclaration);
            const varDeclChildren = varDecl.getChildren();
            const varStmt = varDecl
                .getParentOrThrow()
                .getParentIfKind(SyntaxKind.VariableStatement);
            const varDecls = varStmt?.getDeclarations();
            const varDeclType =
                (varDecls && varDecls[0] === varDecl)
                ? varStmt?.getDeclarationKind()
                : undefined;
            const identifier = varDecl
                ?.getChildAtIndexIfKind(0, SyntaxKind.Identifier)
                ?.getText();

            if (varDeclType && varDecl && identifier) {
                const [_, prediction] = records.findTypesForTokens([varDeclType, identifier]);
                if (prediction) {
                    varDecl.setType(prediction);
                }
            } else if (varStmt && varDecl && identifier) {
                // TODO: this can go wrong, hard to align without keyword
                // e.g. let f = function(x) { let v = x; return v; }, v = 42;
                // the declaration "v = 42" can take the type from "return v"
                // For now, we do nothing.
                /*
                const [prediction] = records.findTypesForTokens([identifier]);
                if (prediction) {
                    varDecl.setType(prediction);
                }
                */
            }
            break;
        }
        case SyntaxKind.FunctionDeclaration: {
            // TODO: default parameters
            const funDecl = node.asKindOrThrow(SyntaxKind.FunctionDeclaration);
            const funName = funDecl.getName();
            const params = funDecl.getParameters();
            const paramNames = params.map(_ => _.getName());

            const tokens: string[] = ["function", funName].concat(paramNames);
            // Pattern match and discard the "undefined" prediction for "function."
            // Separate out the return type prediction for the function name.
            const [_, retType, ...paramTypes]: string[] = records.findTypesForTokens(tokens);

            if (retType) {
                funDecl.setReturnType(retType);
            }

            params.forEach((p, i) => {
                if (paramTypes[i]) {
                    p.setType(paramTypes[i]);
                }
            });
            break;
        }
        case SyntaxKind.FunctionExpression: {
            // TODO: default parameters
            const funExpr = node.asKindOrThrow(SyntaxKind.FunctionExpression);
            const funName = funExpr.getName();
            const params = funExpr.getParameters();
            const paramNames = params.map(_ => _.getName());

            // funName is optional, so filter it out if it's undefined.
            const tokens: string[] = ["function", funName].concat(paramNames).filter(_ => _);
            // Pattern match and discard the "undefined" prediction for "function"
            const [_, ...predictions]: string[] = records.findTypesForTokens(tokens);

            if (funName) {
                const retType: string = predictions.shift();
                if (retType) {
                    funExpr.setReturnType(retType);
                }
            }

            params.forEach((p, i) => {
                if (predictions[i]) {
                    p.setType(predictions[i]);
                }
            });
            break;
        }
        case SyntaxKind.ArrowFunction: {
            // TODO: default parameters
            const arrowFun = node.asKindOrThrow(SyntaxKind.ArrowFunction);
            const params = arrowFun.getParameters();
            const paramNames = params.map(_ => _.getName());

            const tokens: string[] = paramNames.concat(["=>"])
            const predictions: string[] = records.findTypesForTokens(tokens);

            // Discard the "undefined" prediction for "=>"
            predictions.pop();

            params.forEach((p, i) => {
                if (predictions[i]) {
                    p.setType(predictions[i]);
                }
            });
            break;
        }
    }
    node.forEachChild(traverse);
}
traverse(outputFile);

// Print annotated code to console
//console.log(outputFile.getFullText());

// Save the modified file
outputFile.saveSync();
