declare class SingleLineNode {
    constructor(generatedCode: any, source: any, originalSource: any, line: any);
    clone(): SingleLineNode;
    getGeneratedCode(): any;
    getMappings(mappingsContext: any): string;
    getNormalizedNodes(): this[];
    mapGeneratedCode(fn: any): SingleLineNode;
    merge(otherNode: any): false | SourceNode | this;
    mergeSingleLineNode(otherNode: any): false | SourceNode | this;
}
export default SingleLineNode;
import SourceNode from './SourceNode';
