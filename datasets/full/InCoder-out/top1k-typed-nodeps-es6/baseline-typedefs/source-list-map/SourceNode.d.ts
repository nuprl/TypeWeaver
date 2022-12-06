declare class SourceNode {
    constructor(generatedCode: any, source: any, originalSource: any, startingLine: any);
    clone(): SourceNode;
    getGeneratedCode(): any;
    addGeneratedCode(code: any): void;
    getMappings(mappingsContext: any): string;
    mapGeneratedCode(fn: any): void;
    getNormalizedNodes(): any[];
    merge(otherNode: any): false | this;
    mergeSourceNode(otherNode: any): false | this;
    mergeSingleLineNode(otherNode: any): false | this;
    addSingleLineNode(otherNode: any): void;
}
export default SourceNode;
