export = MappingsContext;
declare class MappingsContext {
    sourcesIndices: Map<any, any>;
    sourcesContent: Map<any, any>;
    hasSourceContent: boolean;
    currentOriginalLine: number;
    currentSource: number;
    unfinishedGeneratedLine: boolean;
    ensureSource(source: any, originalSource: any): any;
    getArrays(): {
        sources: any[];
        sourcesContent: any[];
    };
}
