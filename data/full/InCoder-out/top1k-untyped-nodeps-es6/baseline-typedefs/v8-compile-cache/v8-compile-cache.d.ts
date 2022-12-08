/// <reference types="node" />
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
declare function mkdirpSync(p_: string | Buffer): void;
declare function slashEscape(str: string | null): string;
declare function supportsCachedData(): boolean;
declare function getCacheDir(): string;
declare function getMainName(): string;
export declare const __TEST__: {
    FileSystemBlobStore: typeof FileSystemBlobStore;
    NativeCompileCache: typeof NativeCompileCache;
    mkdirpSync: typeof mkdirpSync;
    slashEscape: typeof slashEscape;
    supportsCachedData: typeof supportsCachedData;
    getCacheDir: typeof getCacheDir;
    getMainName: typeof getMainName;
};
export {};
