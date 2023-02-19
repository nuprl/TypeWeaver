/// <reference types="node" />
import { lookup as dnsLookup } from 'dns';
declare class CacheableLookup {
    constructor({ cache, maxTtl, fallbackDuration, errorTtl, resolver, lookup }?: {
        cache?: Map<any, any>;
        maxTtl?: number;
        fallbackDuration?: number;
        errorTtl?: number;
        resolver?: any;
        lookup?: typeof dnsLookup;
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
export default CacheableLookup;
export declare const CacheableLookup: any;
