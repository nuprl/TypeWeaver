import { existsSync, readFileSync } from "node:fs";
import * as path from "path";
import { ArrowFunction, FunctionDeclaration, FunctionExpression, Identifier,
         Node, ParameterDeclaration, Project, SourceFile, SyntaxKind, TypeNode,
         VariableDeclaration, VariableStatement } from "ts-morph";

interface AnnotationCount {
    anys: number;
    total: number;
}

function parseArgs(): string {
    const args: string[] = process.argv;
    if (args.length != 3) {
        console.error("Error: Input file must be provided.");
        process.exit(2);
    }

    const filename: string = args[2];
    if (!existsSync(filename)) {
        console.error("Error: File does not exist: " + filename);
        process.exit(2);
    }

    return filename;
}

function traverse(node: Node): AnnotationCount {
    let runningCount: AnnotationCount = { anys: 0, total: 0 };

    function updateCounts(count: AnnotationCount) {
        runningCount.anys += count.anys;
        runningCount.total += count.total;
    }

    /**
     * Handle variable and parameter nodes, which have a "getTypeNode()" method.
     */
    function handleVarLike(node: VariableDeclaration | ParameterDeclaration): AnnotationCount {
        const typeNode: TypeNode | undefined = node.getTypeNode();
        return {
            anys: typeNode?.getText() === "any" ? 1 : 0,
            total: typeNode ? 1 : 0,
        };
    }

    /*
     * Handle function declaration, function expression, and arrow function nodes,
     * which have a "getReturnTypeNode()" method.
     */
    function handleFunctionLike(node: FunctionDeclaration | FunctionExpression | ArrowFunction): AnnotationCount {
        const typeNode: TypeNode | undefined = node.getReturnTypeNode();
        return {
            anys: typeNode?.getText() === "any" ? 1 : 0,
            total: typeNode ? 1 : 0,
        }
    }

    // Count the annotations for the current node, and update the running count
    let res: AnnotationCount = { anys: 0, total: 0 };
    switch (node.getKind()) {
        case SyntaxKind.VariableDeclaration: {
            const varDecl: VariableDeclaration = node.asKindOrThrow(SyntaxKind.VariableDeclaration);
            res = handleVarLike(varDecl);
            break;
        }
        case SyntaxKind.Parameter: {
            const param: ParameterDeclaration = node.asKindOrThrow(SyntaxKind.Parameter);
            res = handleVarLike(param);
            break;
        }
        case SyntaxKind.FunctionDeclaration: {
            const funDecl: FunctionDeclaration = node.asKindOrThrow(SyntaxKind.FunctionDeclaration);
            res = handleFunctionLike(funDecl);
            break;
        }
        case SyntaxKind.FunctionExpression: {
            const funExpr: FunctionExpression = node.asKindOrThrow(SyntaxKind.FunctionExpression);
            res = handleFunctionLike(funExpr);
            break;
        }
        case SyntaxKind.ArrowFunction: {
            const arrowFun: ArrowFunction = node.asKindOrThrow(SyntaxKind.ArrowFunction);
            res = handleFunctionLike(arrowFun);
            break;
        }
    }
    updateCounts(res)

    // Recursively count annotations in the child nodes
    node.forEachChild((n: Node) => {
        const res: AnnotationCount = traverse(n);
        updateCounts(res);
    });

    return runningCount;
}

const filename: string = parseArgs();

const project: Project = new Project();
const sourceFile: SourceFile = project.addSourceFileAtPath(filename);

// Traverse the file and print results in JSON format
// e.g.: {"anys":0,"total":2}
const res = traverse(sourceFile);
console.log(JSON.stringify(res));
