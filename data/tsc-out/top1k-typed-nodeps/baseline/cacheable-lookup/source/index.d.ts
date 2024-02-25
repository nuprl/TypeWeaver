/// <reference types="node" />
/// <reference types="node" />
export = CacheableLookup;
declare class CacheableLookup {
    constructor({ cache, maxTtl, fallbackDuration, errorTtl, resolver, lookup }?: {
        cache?: Map<any, any>;
        maxTtl?: number;
        fallbackDuration?: number;
        errorTtl?: number;
        resolver?: import("dns/promises").Resolver;
        lookup?: typeof dnsLookup;
    });
    maxTtl: number;
    errorTtl: number;
    _cache: Map<any, any>;
    _resolver: import("dns/promises").Resolver;
    _dnsLookup: typeof dnsLookup.__promisify__;
    stats: {
        cache: number;
        query: number;
    };
    _resolve4: any;
    _resolve6: any;
    _iface: {
        has4: boolean;
        has6: boolean;
    };
    _pending: {};
    _nextRemovalTime: boolean;
    _hostnamesToFallback: Set<any>;
    fallbackDuration: number;
    _fallbackInterval: NodeJS.Timer;
    lookup(hostname: any, options: any, callback: any): void;
    lookupAsync(hostname: any, options?: {}): Promise<any>;
    set servers(arg: string[]);
    get servers(): string[];
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
    queryAndCache(hostname: any): Promise<any[] | import("dns").LookupAddress>;
    _tick(ms: any): void;
    _removalTimeout: NodeJS.Timeout;
    install(agent: any): void;
    uninstall(agent: any): void;
    updateInterfaceInfo(): void;
    clear(hostname: any): void;
}
declare namespace CacheableLookup {
    export { CacheableLookup as default };
}
import { lookup as dnsLookup } from "dns";
