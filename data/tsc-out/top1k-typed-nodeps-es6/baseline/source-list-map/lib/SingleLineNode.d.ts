export default SingleLineNode;
declare class SingleLineNode {
    constructor(generatedCode: any, source: any, originalSource: any, line: any);
    generatedCode: any;
    originalSource: any;
    source: any;
    line: any;
    _numberOfLines: number;
    _endsWithNewLine: boolean;
    clone(): SingleLineNode;
    getGeneratedCode(): any;
    getMappings(mappingsContext: any): string;
    getNormalizedNodes(): SingleLineNode[];
    mapGeneratedCode(fn: any): SingleLineNode;
    merge(otherNode: any): false | SourceNode | SingleLineNode;
    mergeSingleLineNode(otherNode: any): false | SourceNode | SingleLineNode;
}
import SourceNode from "./SourceNode";
