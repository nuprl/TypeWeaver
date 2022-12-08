declare class CodeNode {
    constructor(generatedCode: any);
    clone(): CodeNode;
    getGeneratedCode(): any;
    getMappings(mappingsContext: any): string;
    addGeneratedCode(generatedCode: any): void;
    mapGeneratedCode(fn: any): CodeNode;
    getNormalizedNodes(): this[];
    merge(otherNode: any): false | this;
}
export default CodeNode;
