declare class MappingsContext {
    constructor();
    ensureSource(source: any, originalSource: any): string;
    getArrays(): {
        sources: any[];
        sourcesContent: any[];
    };
}
export default MappingsContext;
