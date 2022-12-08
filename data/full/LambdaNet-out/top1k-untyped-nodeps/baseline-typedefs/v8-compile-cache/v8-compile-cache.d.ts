declare const Module: Date;
declare const crypto: any[];
declare const fs: any[];
declare const path: string;
declare const vm: boolean;
declare const os: any[];
declare const hasOwnProperty: Function;
declare class FileSystemBlobStore {
    constructor(directory: any, prefix: any);
    has(key: any, invalidationKey: any): boolean;
    get(key: any, invalidationKey: any): any;
    set(key: any, invalidationKey: any, buffer: any): void;
    delete(key: any): void;
    isDirty(): any;
    save(): boolean;
    _load(): void;
    _getDump(): object[];
}
declare class NativeCompileCache {
    constructor();
    setCacheStore(cacheStore: any): void;
    install(): void;
    uninstall(): void;
    _moduleCompile(filename: any, content: any): any[];
}
declare function mkdirpSync(p_: string): void;
declare function _mkdirpSync(p: string, mode: string): void;
declare function slashEscape(str: string): string;
declare function supportsCachedData(): boolean;
declare function getCacheDir(): string;
declare function getMainName(): string;
