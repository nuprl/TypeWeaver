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
    private index: number = 1;

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

    advanceIdx(keyword: string, identifier: string): number {
        for (let i = this.index; i < this.records.length - 1; ++i) {
            const prev = this.records[i - 1];
            const rec = this.records[i];
            const next = this.records[i + 1];
            if (keyword && identifier) {
                if (rec.tokenType === "Keyword.Declaration" && rec.tokenValue === keyword && next.tokenValue === identifier) {
                    if (prev.tokenType === "Keyword" && prev.tokenValue === "for") {
                        continue;
                    }
                    this.index = i + 1;
                    return this.index;
                }
            } else if (identifier) {
                if (next.tokenValue === identifier) {
                    this.index = i + 1;
                    return this.index;
                }
            }
        }
        // TODO: does this mean we have an error?
        return this.index;
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
// TODO: This is basically string search

const records = new TypePredictions(csvFilename);


records.debugPrint();
/*
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
                const idx = records.advanceIdx(varDeclType, identifier);
                const prediction: string = records.records[idx].typePrediction;
                if (prediction) {
                    varDecl.setType(prediction);
                    console.log(varDeclType + " " + identifier + ": " + prediction);
                    console.log(records.records[idx]);
                }
            } else if (varStmt && varDecl && identifier) {
                const idx = records.advanceIdx(undefined, identifier);
                const prediction: string = records.records[idx].typePrediction;
                if (prediction) {
                    varDecl.setType(prediction);
                    console.log(identifier + ": " + prediction);
                    console.log(records.records[idx]);
                }
            }
            console.log();
            break;
        }
        case SyntaxKind.FunctionDeclaration: {
            const funDecl = node.asKindOrThrow(SyntaxKind.FunctionDeclaration);
            const funName = funDecl.getName();
            const params = funDecl.getParameters();

            if (funName) {
                const idx = records.advanceIdx("function", funName);
                const prediction: string = records.records[idx].typePrediction;
                if (prediction) {
                    funDecl.setReturnType(prediction);
                    console.log("function " + funName + ": " + prediction);
                    console.log(records.records[idx]);
                }
            }

            for (let p of params) {
                let identifier = p.getName();
                if (identifier) {
                    const idx = records.advanceIdx(undefined, identifier);
                    const prediction: string = records.records[idx].typePrediction;
                    if (prediction) {
                        p.setType(prediction);
                        console.log(identifier + ": " + prediction);
                        console.log(records.records[idx]);
                    }
                }
            }
            console.log();
            break;
        }
        case SyntaxKind.FunctionExpression: {
            const funExpr = node.asKindOrThrow(SyntaxKind.FunctionExpression);
            const funName = funExpr.getName();
            const params = funExpr.getParameters();

            if (funName) {
                const idx = records.advanceIdx("function", funName);
                const prediction: string = records.records[idx].typePrediction;
                if (prediction) {
                    funExpr.setReturnType(prediction);
                    console.log("function " + funName + ": " + prediction);
                    console.log(records.records[idx]);
                }
                for (let p of params) {
                    let identifier = p.getName();
                    if (identifier) {
                        const idx = records.advanceIdx(undefined, identifier);
                        const prediction: string = records.records[idx].typePrediction;
                        if (prediction) {
                            p.setType(prediction);
                            console.log(identifier + ": " + prediction);
                            console.log(records.records[idx]);
                        }
                    }
                }
            } else {
                const firstParam = params.shift();
                const firstParamId = firstParam?.getName();
                if (firstParam) {
                    const idx = records.advanceIdx("function", firstParamId);
                    const prediction: string = records.records[idx].typePrediction;
                    if (prediction) {
                        firstParam.setType(prediction);
                        console.log(firstParamId + ": " + prediction);
                        console.log(records.records[idx]);
                    }
                    for (let p of params) {
                        let identifier = p.getName();
                        if (identifier) {
                            const idx = records.advanceIdx(undefined, identifier);
                            const prediction: string = records.records[idx].typePrediction;
                            if (prediction) {
                                p.setType(prediction);
                                console.log(identifier + ": " + prediction);
                                console.log(records.records[idx]);
                            }
                        }
                    }
                }
            }
            console.log();
            break;
        }
        case SyntaxKind.ArrowFunction: {
            // TODO: handle arrow functions
            // There's no keyword to synchronize with
            // Probably we'll want a more advanced search that can search for a sequence of tokens, e.g.
            // (a, b) => ... will search the CSV for the sequence "a", "b", "=>".
        }
    }

    node.forEachChild(traverse);
}
traverse(outputFile);

// Print annotated code to console
//console.log(outputFile.getFullText());

// Save the modified file
outputFile.saveSync();
