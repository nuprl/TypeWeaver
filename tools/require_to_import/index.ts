import * as fs from "node:fs";
import * as path from "path";
import * as ts from "ts-morph";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const yargsBuilder = yargs(hideBin(process.argv))
    .option("output", {
        alias: "o",
        describe: "output file to write",
        type: "string"
    })
    .option("debug", {
        alias: "d",
        describe: "enable debug output",
        type: "boolean",
        default: false
    })
    .check((argv, options) => {
        const files = argv._;
        if (files.length < 1) {
            throw new Error("Input file must be provided.");
        } else if (files.length > 1) {
            throw new Error("Only 1 input file may be provided.");
        } else {
            return true;
        }
    })
    .help("help");

const argv = yargsBuilder.parseSync();

const inputFilename: string = path.resolve(argv._[0].toString());
const outputFilename: string = typeof argv.output === "undefined"
    ? inputFilename
    : path.resolve(argv.output);

if (!fs.existsSync(inputFilename)) {
    console.log("File does not exist: " + inputFilename);
    yargsBuilder.showHelp();
}

const project: ts.Project = new ts.Project();
const sourceFile: ts.SourceFile = project.addSourceFileAtPath(inputFilename);
let outputFile: ts.SourceFile = sourceFile.copyImmediatelySync(outputFilename, { overwrite: true });

function liftDeclarations(file: ts.SourceFile): void {
    for (const node of file.getChildSyntaxListOrThrow().getChildren()) {
        if (node.getKind() === ts.SyntaxKind.VariableStatement && node.getIndentationLevel() === 0) {
            const varStmt: ts.VariableStatement = node.asKindOrThrow(ts.SyntaxKind.VariableStatement);
            const declKind: ts.VariableDeclarationKind = varStmt.getDeclarationKind();
            const decls: ts.VariableDeclaration[] = varStmt.getDeclarations()

            if (decls.length == 1) {
                continue;
            }

            const newDeclText: string = decls.map(d => `${declKind} ${d.getText()};`).join("\n");

            if (argv.debug) {
                console.log("Lifting: " + varStmt.getText());
            }

            varStmt.replaceWithText(newDeclText);
        }
    }
}

function traverse(file: ts.Node): void {
    for (const node of file.getChildSyntaxListOrThrow().getChildren()) {
        if (node.getKind() === ts.SyntaxKind.VariableStatement && node.getIndentationLevel() === 0) {
            const varStmt: ts.VariableStatement = node.asKindOrThrow(ts.SyntaxKind.VariableStatement);

            const decl: ts.VariableDeclaration = varStmt.getDeclarations()[0];

            const importName: ts.Identifier | undefined =
                decl.getChildAtIndexIfKind(0, ts.SyntaxKind.Identifier);
            const callExpr: ts.CallExpression | undefined =
                decl.getChildAtIndexIfKind(decl.getChildCount() - 1, ts.SyntaxKind.CallExpression);

            if (importName && callExpr) {
                const funID: ts.Identifier | undefined =
                    callExpr.getChildAtIndexIfKind(0, ts.SyntaxKind.Identifier);
                const args: ts.Node[] = callExpr.getArguments()
                const arg: ts.Node | undefined =
                    args.length == 1 && args[0].getKind() === ts.SyntaxKind.StringLiteral
                    ? args[0] : undefined;

                if (funID && funID.getText() === "require" && arg) {
                    const importStr: string = `import ${importName.getText()} from ${arg.getText()};`;

                    if (argv.debug) {
                        console.log("Rewriting: " + varStmt.getText());
                        console.log("       To: " + importStr);
                    }

                    varStmt.replaceWithText(importStr);
                }
            }
        }
    }
}

liftDeclarations(outputFile);
traverse(outputFile);

if (argv.debug) {
    console.log(outputFile.getFullText());
}
outputFile.saveSync();
