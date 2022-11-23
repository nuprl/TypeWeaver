declare const V4MAPPED: any, ADDRCONFIG: any, ALL: any, AsyncResolver: any, dnsLookup: any;
declare const promisify: any;
declare const os: any;
declare const kCacheableLookupCreateConnection: unique symbol;
declare const kCacheableLookupInstance: unique symbol;
declare const kExpires: unique symbol;
declare const supportsALL: boolean;
declare const verifyAgent: (agent: any) => void;
declare const map4to6: (entries: any) => void;
declare const getIfaceInfo: () => {
    has4: boolean;
    has6: boolean;
};
declare const isIterable: (map: any) => boolean;
declare const ignoreNoResultErrors: (dnsPromise: any) => any;
declare const ttl: {
    ttl: boolean;
};
declare const all: {
    all: boolean;
};
declare const all4: {
    all: boolean;
    family: number;
};
declare const all6: {
    all: boolean;
    family: number;
};
declare class CacheableLookup {
    constructor({ cache, maxTtl, fallbackDuration, errorTtl, resolver, lookup }?: {
        cache?: Map<any, any>;
        maxTtl?: number;
        fallbackDuration?: number;
        errorTtl?: number;
        resolver?: any;
        lookup?: any;
    });
    set servers(servers: any);
    get servers(): any;
    lookup(hostname: any, options: any, callback: any): void;
    lookupAsync(hostname: any, options?: {}): Promise<any>;
    query(hostname: any): Promise<any>;
    _resolve(hostname: any): Promise<{
        entries: any[];
        cacheTtl: number;
    }>;
    _lookup(hostname: any): Promise<{
        entries: any[];
        cacheTtl: number;
    }>;
    _set(hostname: any, data: any, cacheTtl: any): Promise<void>;
    queryAndCache(hostname: any): Promise<any>;
    _tick(ms: any): void;
    install(agent: any): void;
    uninstall(agent: any): void;
    updateInterfaceInfo(): void;
    clear(hostname: any): void;
}
