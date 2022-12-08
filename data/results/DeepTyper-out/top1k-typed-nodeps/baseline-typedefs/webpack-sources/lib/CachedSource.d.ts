declare const Source: any;
declare const streamChunksOfSourceMap: any;
declare const streamChunksOfRawSource: any;
declare const streamAndGetSourceAndMap: any;
declare const mapToBufferedMap: any;
declare const bufferedMapToMap: any;
declare class CachedSource extends Source {
    constructor(source: any, cachedData: any);
    getCachedData(): {
        buffer: any;
        source: any;
        size: any;
        maps: any;
        hash: any;
    };
    originalLazy(): any;
    original(): any;
    source(): any;
    _getMapFromCacheEntry(cacheEntry: any): any;
    _getCachedSource(): any;
    buffer(): any;
    size(): any;
    sourceAndMap(options: any): {
        source: any;
        map: any;
    };
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): any;
    map(options: any): any;
    updateHash(hash: any): void;
}
