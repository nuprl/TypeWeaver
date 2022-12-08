declare const perf: number;
declare const hasAbortController: boolean;
declare const AC: object;
declare const hasAbortSignal: boolean;
declare const hasACAbortSignal: boolean;
declare const AS: string;
declare const warned: Error;
declare const deprecatedOption: Function;
declare const deprecatedMethod: Function;
declare const deprecatedProperty: Function;
declare const emitWarning: Function;
declare const shouldWarn: Function;
declare const warn: Function;
declare const isPosInt: Function;
declare const getUintArray: Function;
declare class ZeroArray extends Array {
    constructor(size: any);
}
declare class Stack {
    constructor(max: any);
    push(n: any): void;
    pop(): any;
}
declare class LRUCache {
    constructor(options?: {});
    getRemainingTTL(key: any): number;
    initializeTTLTracking(): void;
    updateItemAge(index: any): void;
    setItemTTL(index: any, ttl: any, start: any): void;
    isStale(index: any): boolean;
    initializeSizeTracking(): void;
    removeItemSize(index: any): void;
    addItemSize(index: any, size: any): void;
    requireSize(k: any, v: any, size: any, sizeCalculation: any): void;
    indexes({ allowStale }?: {
        allowStale?: any;
    }): Generator<any, void, unknown>;
    rindexes({ allowStale }?: {
        allowStale?: any;
    }): Generator<any, void, unknown>;
    isValidIndex(index: any): boolean;
    entries(): Generator<any[], void, unknown>;
    rentries(): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    rkeys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    rvalues(): Generator<any, void, unknown>;
    [Symbol.iterator](): Generator<any[], void, unknown>;
    find(fn: any, getOptions?: {}): any;
    forEach(fn: any, thisp?: this): void;
    rforEach(fn: any, thisp?: this): void;
    get prune(): () => boolean;
    purgeStale(): boolean;
    dump(): any[];
    load(arr: any): void;
    dispose(v: any, k: any, reason: any): void;
    set(k: any, v: any, { ttl, start, noDisposeOnSet, size, sizeCalculation, noUpdateTTL, }?: {
        ttl?: any;
        start: any;
        noDisposeOnSet?: any;
        size?: number;
        sizeCalculation?: any;
        noUpdateTTL?: any;
    }): this;
    newIndex(): any;
    pop(): string;
    evict(free: any): string;
    has(k: any, { updateAgeOnHas }?: {
        updateAgeOnHas?: any;
    }): boolean;
    peek(k: any, { allowStale }?: {
        allowStale?: any;
    }): any;
    backgroundFetch(k: any, index: any, options: any, context: any): string | LRUCache;
    isBackgroundFetch(p: any): boolean;
    fetch(k: any, { allowStale, updateAgeOnGet, noDeleteOnStaleGet, ttl, noDisposeOnSet, size, sizeCalculation, noUpdateTTL, noDeleteOnFetchRejection, fetchContext, forceRefresh, }?: {
        allowStale?: any;
        updateAgeOnGet?: any;
        noDeleteOnStaleGet?: any;
        ttl?: any;
        noDisposeOnSet?: any;
        size?: number;
        sizeCalculation?: any;
        noUpdateTTL?: any;
        noDeleteOnFetchRejection?: any;
        fetchContext?: any;
        forceRefresh?: boolean;
    }): Promise<any>;
    get(k: any, { allowStale, updateAgeOnGet, noDeleteOnStaleGet, }?: {
        allowStale?: any;
        updateAgeOnGet?: any;
        noDeleteOnStaleGet?: any;
    }): any;
    connect(p: any, n: any): void;
    moveToTail(index: any): void;
    get del(): (k: any) => boolean;
    delete(k: any): boolean;
    clear(): void;
    get reset(): () => void;
    get length(): any;
    static get AbortController(): object;
    static get AbortSignal(): string;
}
