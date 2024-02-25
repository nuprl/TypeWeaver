export default SourceListMap;
declare class SourceListMap {
    constructor(generatedCode: any, source: any, originalSource: any);
    children: any[];
    add(generatedCode: any, source: any, originalSource: any): void;
    preprend(generatedCode: any, source: any, originalSource: any): void;
    mapGeneratedCode(fn: any): SourceListMap;
    toString(): string;
    toStringWithSourceMap(options: any): {
        source: string;
        map: {
            version: number;
            file: any;
            sources: any[];
            sourcesContent: any[];
            mappings: string;
        };
    };
}
