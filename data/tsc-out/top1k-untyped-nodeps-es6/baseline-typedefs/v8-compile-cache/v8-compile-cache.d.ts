export namespace __TEST__ {
    export { FileSystemBlobStore };
    export { NativeCompileCache };
    export { mkdirpSync };
    export { slashEscape };
    export { supportsCachedData };
    export { getCacheDir };
    export { getMainName };
}
declare class FileSystemBlobStore {
    constructor(directory: any, prefix: any);
    _blobFilename: string;
    _mapFilename: string;
    _lockFilename: string;
    _directory: any;
    has(key: any, invalidationKey: any): boolean;
    get(key: any, invalidationKey: any): any;
    set(key: any, invalidationKey: any, buffer: any): void;
    _dirty: boolean;
    delete(key: any): void;
    isDirty(): boolean;
    save(): boolean;
    _load(): void;
    _storedBlob: Buffer;
    _storedMap: any;
    _memoryBlobs: {};
    _invalidationKeys: {};
    _getDump(): {}[];
}
declare class NativeCompileCache {
    _cacheStore: any;
    _previousModuleCompile: any;
    setCacheStore(cacheStore: any): void;
    install(): void;
    uninstall(): void;
    _moduleCompile(filename: any, content: any): any;
}
declare function mkdirpSync(p_: any): void;
declare function slashEscape(str: any): any;
declare function supportsCachedData(): boolean;
declare function getCacheDir(): string;
declare function getMainName(): string;
export {};
