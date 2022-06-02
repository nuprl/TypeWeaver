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

// Read and parse CSV file, which contains tokens and the probability distribution of predicted types.
// DeepTyper uses \x1f, the ASCII control character "Unit Separator," to separate values.
// The columns are:
//   token_val, token_type, type1, prob1, type2, prob2, type3, prob3, type4, prob4, type5, prob5
// Token types that are "Name.*" are identifiers, and only these tokens have predicted types.
// The types are listed in decreasing probability.
// We only keep the records that have types, and throw everything away except the top type prediction.
const csvContents: Buffer = readFileSync(csvFilename);
const typePredictions: string[] = parse(csvContents, {
    delimiter: "\x1f",
    on_record: (record, _) => record[1].startsWith("Name") ? record[2] : null,
    quote: false,
    relax_column_count: true,
    trim: true
});

// Count how many identifier nodes have been seen.
// This is used to align with and index into the type predictions array.
let counter: number = 0;

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
    if (node.getKind() === SyntaxKind.Identifier) {
        let id = node.asKindOrThrow(SyntaxKind.Identifier);
        let parentNode = id.getParent();

        // Check if the Identifier's parent node is one of the types of nodes we can annotate.
        switch (parentNode.getKind()) {
            case SyntaxKind.FunctionDeclaration:
                let funDecl = parentNode.asKindOrThrow(SyntaxKind.FunctionDeclaration);
                funDecl.setReturnType(typePredictions[counter]);
                break;
            case SyntaxKind.Parameter:
                let param = parentNode.asKindOrThrow(SyntaxKind.Parameter);
                param.setType(typePredictions[counter]);
                break;
            case SyntaxKind.VariableDeclaration:
                // Check that this is a variable statement:
                //   VariableStatement -> VariableDeclarations -> VariableDeclaration
                // for...in and for...of statements are not VariableStatements.
                // Also check that the first child is an Identifier:
                //   VariableDeclaration -> Identifier
                // This avoids destructuring assignments.
                let varDecl = parentNode.asKindOrThrow(SyntaxKind.VariableDeclaration);
                let varStmt = varDecl.getParentOrThrow().getParentOrThrow();
                let varDeclChildren = varDecl.getChildren();
                if (varStmt.getKind() === SyntaxKind.VariableStatement
                    && varDeclChildren.length > 0
                    && varDeclChildren[0] === id) {
                    varDecl.setType(typePredictions[counter]);
                }
                break;
            case SyntaxKind.FunctionExpression:
                // If the parent node of an Identifier is a FunctionExpression,
                // then the FunctionExpression is named and has a type prediction, so we set its type.
                let funExpr = parentNode.asKindOrThrow(SyntaxKind.FunctionExpression);
                funExpr.setReturnType(typePredictions[counter]);
                break;
        }
        counter++;
    }
    node.forEachChild(traverse);
}
traverse(outputFile);

// Print annotated code to console
console.log(outputFile.getFullText());

// Save the modified file
outputFile.saveSync();
