declare const V4MAPPED: any, ADDRCONFIG: any, ALL: any, AsyncResolver: any, dnsLookup: any;
declare const promisify: any;
declare const os: string;
declare const kCacheableLookupCreateConnection: string;
declare const kCacheableLookupInstance: any[];
declare const kExpires: string;
declare const supportsALL: boolean;
declare const verifyAgent: Function;
declare const map4to6: Function;
declare const getIfaceInfo: Function;
declare const isIterable: Function;
declare const ignoreNoResultErrors: Function;
declare const ttl: object;
declare const all: object;
declare const all4: object;
declare const all6: object;
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
    query(hostname: any): Promise<any[]>;
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
