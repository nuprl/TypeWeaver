declare class MappingsContext {
    constructor();
    ensureSource(source: any, originalSource: any): any;
    getArrays(): {
        sources: any[];
        sourcesContent: any[];
    };
}
