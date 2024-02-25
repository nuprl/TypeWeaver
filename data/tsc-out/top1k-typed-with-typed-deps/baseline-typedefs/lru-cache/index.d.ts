export = LRUCache;
declare class LRUCache {
    static get AbortController(): any;
    static get AbortSignal(): any;
    constructor(options?: {});
    max: any;
    maxSize: any;
    maxEntrySize: any;
    sizeCalculation: any;
    fetchMethod: any;
    fetchContext: any;
    keyMap: Map<any, any>;
    keyList: any[];
    valList: any[];
    next: Uint8Array | Uint16Array | Uint32Array | ZeroArray;
    prev: Uint8Array | Uint16Array | Uint32Array | ZeroArray;
    head: number;
    tail: number;
    free: Stack;
    initialFill: number;
    size: number;
    dispose(v: any, k: any, reason: any): void;
    disposeAfter: any;
    disposed: any[];
    noDisposeOnSet: boolean;
    noUpdateTTL: boolean;
    noDeleteOnFetchRejection: boolean;
    allowStale: boolean;
    noDeleteOnStaleGet: boolean;
    updateAgeOnGet: boolean;
    updateAgeOnHas: boolean;
    ttlResolution: any;
    ttlAutopurge: boolean;
    ttl: any;
    getRemainingTTL(key: any): number;
    initializeTTLTracking(): void;
    ttls: ZeroArray;
    starts: ZeroArray;
    setItemTTL(index: any, ttl: any, start: any): void;
    updateItemAge(index: any): void;
    isStale(index: any): boolean;
    initializeSizeTracking(): void;
    calculatedSize: number;
    sizes: ZeroArray;
    removeItemSize(index: any): void;
    requireSize(k: any, v: any, size: any, sizeCalculation: any): void;
    addItemSize(index: any, size: any): void;
    indexes({ allowStale }?: {
        allowStale?: boolean;
    }): Generator<number, void, unknown>;
    rindexes({ allowStale }?: {
        allowStale?: boolean;
    }): Generator<number, void, unknown>;
    isValidIndex(index: any): boolean;
    entries(): Generator<any[], void, unknown>;
    rentries(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    rkeys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    rvalues(): Generator<any, void, unknown>;
    find(fn: any, getOptions?: {}): any;
    forEach(fn: any, thisp?: LRUCache): void;
    rforEach(fn: any, thisp?: LRUCache): void;
    get prune(): () => boolean;
    purgeStale(): boolean;
    dump(): any[][];
    load(arr: any): void;
    set(k: any, v: any, { ttl, start, noDisposeOnSet, size, sizeCalculation, noUpdateTTL, }?: {
        ttl?: any;
        start: any;
        noDisposeOnSet?: boolean;
        size?: number;
        sizeCalculation?: any;
        noUpdateTTL?: boolean;
    }): LRUCache;
    newIndex(): any;
    pop(): any;
    evict(free: any): number;
    has(k: any, { updateAgeOnHas }?: {
        updateAgeOnHas?: boolean;
    }): boolean;
    peek(k: any, { allowStale }?: {
        allowStale?: boolean;
    }): any;
    backgroundFetch(k: any, index: any, options: any, context: any): any;
    isBackgroundFetch(p: any): boolean;
    fetch(k: any, { allowStale, updateAgeOnGet, noDeleteOnStaleGet, ttl, noDisposeOnSet, size, sizeCalculation, noUpdateTTL, noDeleteOnFetchRejection, fetchContext, forceRefresh, }?: {
        allowStale?: boolean;
        updateAgeOnGet?: boolean;
        noDeleteOnStaleGet?: boolean;
        ttl?: any;
        noDisposeOnSet?: boolean;
        size?: number;
        sizeCalculation?: any;
        noUpdateTTL?: boolean;
        noDeleteOnFetchRejection?: boolean;
        fetchContext?: any;
        forceRefresh?: boolean;
    }): Promise<any>;
    get(k: any, { allowStale, updateAgeOnGet, noDeleteOnStaleGet, }?: {
        allowStale?: boolean;
        updateAgeOnGet?: boolean;
        noDeleteOnStaleGet?: boolean;
    }): any;
    connect(p: any, n: any): void;
    moveToTail(index: any): void;
    get del(): (k: any) => boolean;
    delete(k: any): boolean;
    clear(): void;
    get reset(): () => void;
    get length(): number;
    [Symbol.iterator](): Generator<any[], void, unknown>;
}
declare class ZeroArray extends Array<any> {
    constructor(size: any);
}
declare class Stack {
    constructor(max: any);
    heap: Uint8Array | Uint16Array | Uint32Array | ZeroArray;
    length: number;
    push(n: any): void;
    pop(): any;
}
