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
}

// This class parses the CSV file and maintains an array of type predictions.
// However, the sequence of predictions does not directly correspond to the declarations
// encountered in an AST traversal of the program. Therefore, the tree traversal
// will query this class and ask for the predictions for the given identifiers.
class TypePredictions {
    readonly records: Record[];

    // Internal index into the records array, used for searching.
    private index: number;

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
                const pred = record[2];
                // Only take tokens that are names or reserved keywords
                // (since they might be identifiers)
                if (tokType.startsWith("Name") || tokType.startsWith("Keyword") || tokVal === "=>") {
                    return {
                        tokenValue: tokVal,
                        tokenType: tokType,
                        typePrediction: pred,
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
}

const csvContents: Buffer = readFileSync(csvFilename);
const csvRecords = parse(csvContents, {
    delimiter: "\x1f",
    on_record: function (record, _) {
        const tokVal = record[0];
        const tokType = record[1];
        if (tokType.startsWith("Name") || tokType.startsWith("Keyword") || tokVal === "=>") {
            return record;
        } else {
            return null;
        }
    },
    quote: false,
    relax_column_count: true,
    trim: true
});
let csvLength: number = csvRecords.length;
let csvIdx: number = 1;

// TODO: be careful about keeping indices within bounds...
function advanceIdx(idx: number, keyword: string, identifier: string): number {
    for (let i = idx; i < csvRecords.length - 1; ++i) {
        const prevRecord = csvRecords[i - 1];
        const record = csvRecords[i];
        const nextRecord = csvRecords[i + 1];
        if (keyword && identifier) {
            if (record[1] === "Keyword.Declaration" && record[0] === keyword && nextRecord[0] === identifier) {
                // Because we filtered out comments and whitespace, we can check if
                // the preceding token is a "for". If so, this declaration is part of
                // a for loop and we should skip it.
                if (prevRecord[1] === "Keyword" && prevRecord[0] === "for") {
                    continue;
                }
                return i + 1;
            }
        } else if (identifier) {
            if (nextRecord[0] === identifier) {
                return i + 1;
            }
        }
    }
    // TODO: this means we have an error
    return idx;
}

// TODO: This is basically string search


for (var r of csvRecords) {
    console.log(r);
}
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
                csvIdx = advanceIdx(csvIdx, varDeclType, identifier);
                const prediction: string = csvRecords[csvIdx][2];
                if (prediction) {
                    varDecl.setType(prediction);
                    //console.log(varDeclType + " " + identifier + ": " + prediction);
                    //console.log(csvRecords[csvIdx]);
                }
            } else if (varStmt && varDecl && identifier) {
                csvIdx = advanceIdx(csvIdx, undefined, identifier);
                const prediction: string = csvRecords[csvIdx][2];
                if (prediction) {
                    varDecl.setType(prediction);
                    //console.log(identifier + ": " + prediction);
                    //console.log(csvRecords[csvIdx]);
                }
            }
            //console.log();
            break;
        }
        case SyntaxKind.FunctionDeclaration: {
            const funDecl = node.asKindOrThrow(SyntaxKind.FunctionDeclaration);
            const funName = funDecl.getName();
            const params = funDecl.getParameters();

            if (funName) {
                csvIdx = advanceIdx(csvIdx, "function", funName);
                const prediction: string = csvRecords[csvIdx][2];
                if (prediction) {
                    funDecl.setReturnType(prediction);
                    //console.log("function " + funName + ": " + prediction);
                    //console.log(csvRecords[csvIdx]);
                }
            }

            for (let p of params) {
                let identifier = p.getName();
                if (identifier) {
                    csvIdx = advanceIdx(csvIdx, undefined, identifier);
                    const prediction: string = csvRecords[csvIdx][2];
                    if (prediction) {
                        p.setType(prediction);
                        //console.log(identifier + ": " + prediction);
                        //console.log(csvRecords[csvIdx]);
                    }
                }
            }
            //console.log();
            break;
        }
        case SyntaxKind.FunctionExpression: {
            const funExpr = node.asKindOrThrow(SyntaxKind.FunctionExpression);
            const funName = funExpr.getName();
            const params = funExpr.getParameters();

            if (funName) {
                csvIdx = advanceIdx(csvIdx, "function", funName);
                const prediction: string = csvRecords[csvIdx][2];
                if (prediction) {
                    funExpr.setReturnType(prediction);
                    //console.log("function " + funName + ": " + prediction);
                    //console.log(csvRecords[csvIdx]);
                }
                for (let p of params) {
                    let identifier = p.getName();
                    if (identifier) {
                        csvIdx = advanceIdx(csvIdx, undefined, identifier);
                        const prediction: string = csvRecords[csvIdx][2];
                        if (prediction) {
                            p.setType(prediction);
                            //console.log(identifier + ": " + prediction);
                            //console.log(csvRecords[csvIdx]);
                        }
                    }
                }
            } else {
                const firstParam = params.shift();
                const firstParamId = firstParam?.getName();
                if (firstParam) {
                    csvIdx = advanceIdx(csvIdx, "function", firstParamId);
                    const prediction: string = csvRecords[csvIdx][2];
                    if (prediction) {
                        firstParam.setType(prediction);
                        //console.log(firstParamId + ": " + prediction);
                        //console.log(csvRecords[csvIdx]);
                    }
                    for (let p of params) {
                        let identifier = p.getName();
                        if (identifier) {
                            csvIdx = advanceIdx(csvIdx, undefined, identifier);
                            const prediction: string = csvRecords[csvIdx][2];
                            if (prediction) {
                                p.setType(prediction);
                                //console.log(identifier + ": " + prediction);
                                //console.log(csvRecords[csvIdx]);
                            }
                        }
                    }
                }
            }
            //console.log();
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
