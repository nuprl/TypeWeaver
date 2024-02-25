export = CachedInputFileSystem;
declare class CachedInputFileSystem {
    constructor(fileSystem: any, duration: any);
    fileSystem: any;
    _lstatBackend: OperationMergerBackend | CacheBackend;
    lstat: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<import("./Resolver").FileSystemStats>) => void) & ((arg0: string, arg1: any, arg2: import("./Resolver").FileSystemCallback<string | Buffer>) => void);
    lstatSync: (arg0: string, arg1?: any) => import("./Resolver").FileSystemStats;
    _statBackend: OperationMergerBackend | CacheBackend;
    stat: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<import("./Resolver").FileSystemStats>) => void) & ((arg0: string, arg1: any, arg2: import("./Resolver").FileSystemCallback<string | Buffer>) => void);
    statSync: (arg0: string, arg1?: any) => import("./Resolver").FileSystemStats;
    _readdirBackend: OperationMergerBackend | CacheBackend;
    readdir: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<(string | Buffer)[] | import("./Resolver").FileSystemDirent[]>) => void) & ((arg0: string, arg1: any, arg2: import("./Resolver").FileSystemCallback<(string | Buffer)[] | import("./Resolver").FileSystemDirent[]>) => void);
    readdirSync: (arg0: string, arg1?: any) => (string | Buffer)[] | import("./Resolver").FileSystemDirent[];
    _readFileBackend: OperationMergerBackend | CacheBackend;
    readFile: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<string | Buffer>) => void) & ((arg0: string, arg1: any, arg2: import("./Resolver").FileSystemCallback<string | Buffer>) => void);
    readFileSync: (arg0: string, arg1?: any) => string | Buffer;
    _readJsonBackend: OperationMergerBackend | CacheBackend;
    readJson: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<any>) => void) & ((arg0: string, arg1: any, arg2: import("./Resolver").FileSystemCallback<any>) => void);
    readJsonSync: (arg0: string, arg1?: any) => any;
    _readlinkBackend: OperationMergerBackend | CacheBackend;
    readlink: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<string | Buffer>) => void) & ((arg0: string, arg1: any, arg2: import("./Resolver").FileSystemCallback<string | Buffer>) => void);
    readlinkSync: (arg0: string, arg1?: any) => string | Buffer;
    purge(what: any): void;
}
declare namespace CachedInputFileSystem {
    export { FileSystem, SyncFileSystem };
}
declare class OperationMergerBackend {
    /**
     * @param {any} provider async method
     * @param {any} syncProvider sync method
     * @param {any} providerContext call context for the provider methods
     */
    constructor(provider: any, syncProvider: any, providerContext: any);
    _provider: any;
    _syncProvider: any;
    _providerContext: any;
    _activeAsyncOperations: Map<any, any>;
    provide: (path: any, options: any, callback: any) => any;
    provideSync: (path: any, options: any) => any;
    purge(): void;
    purgeParent(): void;
}
declare class CacheBackend {
    /**
     * @param {number} duration max cache duration of items
     * @param {any} provider async method
     * @param {any} syncProvider sync method
     * @param {any} providerContext call context for the provider methods
     */
    constructor(duration: number, provider: any, syncProvider: any, providerContext: any);
    _duration: number;
    _provider: any;
    _syncProvider: any;
    _providerContext: any;
    /** @type {Map<string, (function(Error, any): void)[]>} */
    _activeAsyncOperations: Map<string, ((arg0: Error, arg1: any) => void)[]>;
    /** @type {Map<string, { err: Error, result: any, level: Set<string> }>} */
    _data: Map<string, {
        err: Error;
        result: any;
        level: Set<string>;
    }>;
    /** @type {Set<string>[]} */
    _levels: Set<string>[];
    _currentLevel: number;
    _tickInterval: number;
    /** @type {STORAGE_MODE_IDLE | STORAGE_MODE_SYNC | STORAGE_MODE_ASYNC} */
    _mode: 0 | 1 | 2;
    /** @type {NodeJS.Timeout | undefined} */
    _timeout: NodeJS.Timeout | undefined;
    /** @type {number | undefined} */
    _nextDecay: number | undefined;
    provide(path: any, options: any, callback: any): any;
    provideSync(path: any, options: any): any;
    purge(what: any): void;
    purgeParent(what: any): void;
    _storeResult(path: any, err: any, result: any): void;
    _decayLevel(): void;
    _runDecays(): void;
    _enterAsyncMode(): void;
    _enterSyncModeWhenIdle(): void;
    _enterIdleMode(): void;
}
type FileSystem = import("./Resolver").FileSystem;
type SyncFileSystem = import("./Resolver").SyncFileSystem;
