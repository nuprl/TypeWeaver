declare const Module: any;
declare const crypto: any;
declare const fs: any;
declare const path: any;
declare const vm: any;
declare const os: any;
declare const hasOwnProperty: any;
declare class FileSystemBlobStore {
    constructor(directory: any, prefix: any);
    has(key: any, invalidationKey: any): boolean;
    get(key: any, invalidationKey: any): any;
    set(key: any, invalidationKey: any, buffer: any): void;
    delete(key: any): void;
    isDirty(): any;
    save(): boolean;
    _load(): void;
    _getDump(): {}[];
}
declare class NativeCompileCache {
    constructor();
    setCacheStore(cacheStore: any): void;
    install(): void;
    uninstall(): void;
    _moduleCompile(filename: any, content: any): any;
}
declare function mkdirpSync(p_: any): any;
declare function _mkdirpSync(p: string, mode: string): void;
declare function slashEscape(str: string): any;
declare function supportsCachedData(): boolean;
declare function getCacheDir(): any;
declare function getMainName(): any;
