declare const Source: string;
declare const streamChunksOfSourceMap: Function;
declare const streamChunksOfRawSource: Function;
declare const streamAndGetSourceAndMap: Function;
declare const mapToBufferedMap: Function;
declare const bufferedMapToMap: Function;
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
        map: any[];
    } | {
        source: string;
        map: string;
    };
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): any;
    map(options: any): any;
    updateHash(hash: any): void;
}
