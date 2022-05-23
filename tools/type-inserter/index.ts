import { accessSync, constants } from "node:fs";
import { printNode, Project, SourceFile, SyntaxKind } from "ts-morph";
const path = require('node:path');

const jsFilename: string = process.argv[2];
const jsPath = path.parse(jsFilename);
const tsFilename: string = path.join(jsPath.dir, jsPath.name + ".ts");

try {
    accessSync(jsFilename, constants.F_OK);
} catch (err) {
    console.error(jsFilename + ": file does not exist");
    process.exit(1);
}

const project: Project = new Project();
const sourceFile: SourceFile = project.addSourceFileAtPath(jsFilename)
let outputFile = project.createSourceFile(tsFilename, "", { overwrite: true });

// TODO: read in DT CSV file into a data structure, remove unncessary stuff,
// align identifiers+types and insert types

function traverse(node: SourceFile): void {
    switch (node.getKind()) {
        case SyntaxKind.FunctionDeclaration:
            let funDecl = node.asKindOrThrow(SyntaxKind.FunctionDeclaration);
            funDecl.setReturnType("any");
            break;
        case SyntaxKind.Parameter:
            let param = node.asKindOrThrow(SyntaxKind.Parameter);
            param.setType("any");
            break;
        case SyntaxKind.VariableDeclaration:
            // Only annotate declarations if it's a variable statement, not for loops
            //   VariableStatement -> VariableDeclarationList -> VariableDeclaration
            // Only annotate identifires, not binding patterns (aka destructuring patterns)
            //   VariableDeclaration -> Identifier
            let varDecl = node.asKindOrThrow(SyntaxKind.VariableDeclaration);
            let grandparent = varDecl.getParentOrThrow().getParentOrThrow();
            let children = varDecl.getChildren();
            if (grandparent.getKind() === SyntaxKind.VariableStatement
                && varDecl.getChildCount() > 0
                && children[0].getKind() === SyntaxKind.Identifier) {
                varDecl.setType("any");
            }
            break;
        case SyntaxKind.FunctionExpression:
            // TODO: this should probably be handled as part of a VariableDeclaration
            // Either we set the return type here, or we set it on the declaration.
            // We can only set it here if the function expression has a name.
            let funExpr = node.asKindOrThrow(SyntaxKind.FunctionExpression);
            if (funExpr.getName() !== undefined) {
                funExpr.setReturnType("any");
            }
            break;
    }
    node.forEachChild(traverse);
}
traverse(sourceFile);

// Write to output file
//outputFile.insertText(0, sourceFile.getFullText()).saveSync();
console.log(sourceFile.getFullText());
