import { accessSync, constants } from "node:fs";
import { printNode, Project, SourceFile,
 FunctionDeclaration, VariableDeclaration } from "ts-morph";

const filename: string = process.argv[2];

try {
    accessSync(filename, constants.F_OK);
} catch (err) {
    console.error(filename + ": file does not exist");
    process.exit(1);
}

const project: Project = new Project();
const sourceFile: SourceFile = project.addSourceFileAtPath(filename)

let indent: number = 0;

// VariableStatement -> VariableDeclarationList -> VariableDeclaration
// FunctionDeclaration
// FunctionExpression, ArrowFunction
// MethodDeclaration

function printTree(node: SourceFile): void {
        console.log(new Array(indent + 1).join(' ') + node.getKindName());
        indent++;
        node.forEachChild(printTree);
        indent--;
}
//printTree(sourceFile);

const funDecls: FunctionDeclaration[] = sourceFile.getFunctions();
const varDecls: VariableDeclaration[] = sourceFile.getVariableDeclarations();

// Basic example of setting types
// But still need to recures into function bodies
// And extract the types from the CSV file
const factorDecl: FunctionDeclaration = funDecls[0];
factorDecl.setReturnType("number");
factorDecl.getParameters()[0].setType("int");

//const output = printNode(factorDecl.compilerNode);
const output = printNode(funDecls[0].getVariableDeclarations()[1].compilerNode);

//const output = printNode(sourceFile.compilerNode);
console.log(output);

// First task: traverse AST (in source code order) and print out every
// function declaration and variable declaration, in order
// Probably better to just traverse, instead of using "getFunctions" and "getVariableDeclarations"

// Second task: read in DT CSV file into a data structure, remove unnecessary stuff

// Then align AST with CSV and insert types
