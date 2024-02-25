export = CachedSource;
declare class CachedSource extends Source {
    constructor(source: any, cachedData: any);
    _source: any;
    _cachedSourceType: any;
    _cachedSource: any;
    _cachedBuffer: any;
    _cachedSize: any;
    _cachedMaps: any;
    _cachedHashUpdate: any;
    getCachedData(): {
        buffer: any;
        source: any;
        size: any;
        maps: Map<any, any>;
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
    streamChunks(options: any, onChunk: any, onSource: any, onName: any): {
        generatedLine?: undefined;
        generatedColumn?: undefined;
        source?: undefined;
    } | {
        generatedLine: number;
        generatedColumn: any;
    } | {
        generatedLine: any;
        generatedColumn: any;
        source: any;
    };
    map(options: any): any;
    updateHash(hash: any): void;
}
import Source = require("./Source");
