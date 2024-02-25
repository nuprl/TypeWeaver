export = SourceNode;
declare class SourceNode {
    constructor(generatedCode: any, source: any, originalSource: any, startingLine: any);
    generatedCode: any;
    originalSource: any;
    source: any;
    startingLine: any;
    _numberOfLines: number;
    _endsWithNewLine: boolean;
    clone(): SourceNode;
    getGeneratedCode(): any;
    addGeneratedCode(code: any): void;
    getMappings(mappingsContext: any): string;
    mapGeneratedCode(fn: any): void;
    getNormalizedNodes(): SingleLineNode[];
    merge(otherNode: any): false | SourceNode;
    mergeSourceNode(otherNode: any): false | SourceNode;
    mergeSingleLineNode(otherNode: any): false | SourceNode;
    addSingleLineNode(otherNode: any): void;
}
import SingleLineNode = require("./SingleLineNode");
