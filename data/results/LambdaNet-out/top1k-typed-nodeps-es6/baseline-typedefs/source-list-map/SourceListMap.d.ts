declare class SourceListMap {
    constructor(generatedCode: any, source: any, originalSource: any);
    add(generatedCode: any, source: any, originalSource: any): void;
    preprend(generatedCode: any, source: any, originalSource: any): void;
    mapGeneratedCode(fn: any): SourceListMap;
    toString(): any;
    toStringWithSourceMap(options: any): {
        source: string;
        map: {
            version: number;
            file: any;
            sources: any;
            sourcesContent: any;
            mappings: string;
        };
    };
}
export default SourceListMap;
