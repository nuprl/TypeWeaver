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

// This class parses the CSV file and maintains an array of type predictions.
// However, the sequence of predictions does not directly correspond to the declarations
// encountered in an AST traversal of the program. Therefore, the tree traversal
// will query this class and ask for the predictions for the given identifiers.
class TypePredictions {
    readonly records: Record[];

    // Internal index into the records array, used for searching.
    private index: number = 0;

    // Read and parse CSV file, which contains tokens and the probability distribution of
    // predicted types.
    constructor(filename: string) {
        const contents: Buffer = readFileSync(filename);
        this.records = parse(contents, {
            // DeepTyper uses \x1f, the ASCII control character "Unit Separator"
            delimiter: "\x1f",
            // The columns are:
            //   token_val, token_type, type1, prob1, ...
            on_record: function (record, _) {
                const tokVal = record[0];
                const tokType = record[1];
                // Only take tokens that are names or reserved keywords
                // (since they might be identifiers)
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

    findTypesForTokens(tokens: string[]): string[] {
        console.log(tokens);
        const n: number = this.records.length;
        const m: number = tokens.length;
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
                if (i > 0 && this.records[i - 1].tokenValue === "for") {
                    continue;
                }
                const entries: Record[] = this.records.slice(i, i + m);
                const predictions: string[] = entries.map(_ => _.typePrediction);
                console.log("prediction(s): " + predictions);
                console.log(entries);
                this.index = i;
                return predictions;
            }
        }
        // TODO: better handling for this?
        return undefined;
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


/*
records.debugPrint();
function debugTraverse(node: SourceFile): void {
    if (node.getChildCount() == 0) {
        console.log("  " + node.getKindName() + " " + node.getText().split("\n")[0]);
    } else {
        console.log(node.getKindName() + " " + node.getText().split("\n")[0]);
    }
    node.forEachChild(debugTraverse);
}
debugTraverse(sourceFile);
*/

// This function iterates over all Identifiers in the AST and it sets type annotations for:
//   - function declarations            function f() { ... }
//   - function parameters              function f(a, b, c) { ... }
//   - variable declarations            var/let/const x = 42;
//     that are not for...in or for...of statements
//                                      for (var x in/of y) stmt
//     and are not destructuring assignments
//                                      let [a, b] = c)
//   - named function expressions       let fun = function f() { ... }
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
                const [prediction] = records.findTypesForTokens([identifier]);
                if (prediction) {
                    varDecl.setType(prediction);
                }
            }
            break;
        }
        case SyntaxKind.FunctionDeclaration: {
            const funDecl = node.asKindOrThrow(SyntaxKind.FunctionDeclaration);
            const funName = funDecl.getName();
            const params = funDecl.getParameters();
            const paramNames = params.map(_ => _.getName());

            const tokens: string[] = ["function", funName].concat(paramNames);
            const [_, retType, ...paramTypes]: string[] = records.findTypesForTokens(tokens);

            if (funName && retType) {
                funDecl.setReturnType(retType);
            }

            for (let i in params) {
                if (paramNames[i] && paramTypes[i]) {
                    params[i].setType(paramTypes[i]);
                }
            }
            break;
        }
        case SyntaxKind.FunctionExpression: {
            // TODO: this isn't as robust, if the function expression is anonymous
            // we're searching for the token sequence "function param1 param2 ..." which may not be unique
            const funExpr = node.asKindOrThrow(SyntaxKind.FunctionExpression);
            const funName = funExpr.getName();
            const params = funExpr.getParameters();
            const paramNames = params.map(_ => _.getName());

            const tokens: string[] = ["function", funName].concat(paramNames).filter(_ => _);
            const [_, ...predictions]: string[] = records.findTypesForTokens(tokens);

            if (funName) {
                const retType: string = predictions.shift();
                if (retType) {
                    funExpr.setReturnType(retType);
                }
            }

            for (let i in params) {
                if (paramNames[i] && predictions[i]) {
                    params[i].setType(predictions[i]);
                }
            }
            break;
        }
        case SyntaxKind.ArrowFunction: {
            // TODO: this isn't as robust
            // we're searching for the token sequence "param1 param2 =>" which may not be unique
            const arrowFun = node.asKindOrThrow(SyntaxKind.ArrowFunction);
            const params = arrowFun.getParameters();
            const paramNames = params.map(_ => _.getName());

            const tokens: string[] = paramNames.concat(["=>"])
            const predictions: string[] = records.findTypesForTokens(tokens);
            predictions.pop();

            for (let i in params) {
                if (paramNames[i] && predictions[i]) {
                    params[i].setType(predictions[i]);
                }
            }
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
