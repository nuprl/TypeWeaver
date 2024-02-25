export = CodeNode;
declare class CodeNode {
    constructor(generatedCode: any);
    generatedCode: any;
    clone(): CodeNode;
    getGeneratedCode(): any;
    getMappings(mappingsContext: any): string;
    addGeneratedCode(generatedCode: any): void;
    mapGeneratedCode(fn: any): CodeNode;
    getNormalizedNodes(): CodeNode[];
    merge(otherNode: any): false | CodeNode;
}
