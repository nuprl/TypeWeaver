declare const V4MAPPED: any, ADDRCONFIG: any, ALL: any, AsyncResolver: any, dnsLookup: any;
declare const promisify: any;
declare const os: any;
declare const kCacheableLookupCreateConnection: symbol;
declare const kCacheableLookupInstance: symbol;
declare const kExpires: symbol;
declare const supportsALL: boolean;
declare const verifyAgent: any;
declare const map4to6: any;
declare const getIfaceInfo: void;
declare const isIterable: any;
declare const ignoreNoResultErrors: any;
declare const ttl: number;
declare const all: boolean;
declare const all4: any;
declare const all6: any;
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
