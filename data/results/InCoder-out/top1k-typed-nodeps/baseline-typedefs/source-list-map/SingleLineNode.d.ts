declare const base64VLQ: any;
declare const getNumberOfLines: any;
declare const getUnfinishedLine: any;
declare const LINE_MAPPING = ";AAAA";
declare class SingleLineNode {
    constructor(generatedCode: any, source: any, originalSource: any, line: any);
    clone(): SingleLineNode;
    getGeneratedCode(): any;
    getMappings(mappingsContext: any): string;
    getNormalizedNodes(): this[];
    mapGeneratedCode(fn: any): SingleLineNode;
    merge(otherNode: any): any;
    mergeSingleLineNode(otherNode: any): any;
}
declare const SourceNode: any;
