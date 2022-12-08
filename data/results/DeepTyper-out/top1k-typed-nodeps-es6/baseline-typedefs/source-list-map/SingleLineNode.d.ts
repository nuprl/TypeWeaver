declare class SingleLineNode {
    constructor(generatedCode: any, source: any, originalSource: any, line: any);
    clone(): SingleLineNode;
    getGeneratedCode(): any;
    getMappings(mappingsContext: any): string;
    getNormalizedNodes(): this[];
    mapGeneratedCode(fn: any): SingleLineNode;
    merge(otherNode: any): false | this | SourceNode;
    mergeSingleLineNode(otherNode: any): false | this | SourceNode;
}
export default SingleLineNode;
import SourceNode from './SourceNode';
