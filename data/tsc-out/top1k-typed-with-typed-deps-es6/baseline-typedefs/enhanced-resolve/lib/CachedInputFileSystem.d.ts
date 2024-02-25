export default class CachedInputFileSystem {
    constructor(fileSystem: any, duration: any);
    fileSystem: any;
    _lstatBackend: OperationMergerBackend | CacheBackend;
    lstat: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<import("./Resolver").FileSystemStats>) => void) & ((arg0: string, arg1: object, arg2: import("./Resolver").FileSystemCallback<string | Buffer>) => void);
    lstatSync: (arg0: string, arg1: object) => import("./Resolver").FileSystemStats;
    _statBackend: OperationMergerBackend | CacheBackend;
    stat: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<import("./Resolver").FileSystemStats>) => void) & ((arg0: string, arg1: object, arg2: import("./Resolver").FileSystemCallback<string | Buffer>) => void);
    statSync: (arg0: string, arg1: object) => import("./Resolver").FileSystemStats;
    _readdirBackend: OperationMergerBackend | CacheBackend;
    readdir: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<(string | Buffer)[] | import("./Resolver").FileSystemDirent[]>) => void) & ((arg0: string, arg1: object, arg2: import("./Resolver").FileSystemCallback<(string | Buffer)[] | import("./Resolver").FileSystemDirent[]>) => void);
    readdirSync: (arg0: string, arg1: object) => (string | Buffer)[] | import("./Resolver").FileSystemDirent[];
    _readFileBackend: OperationMergerBackend | CacheBackend;
    readFile: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<string | Buffer>) => void) & ((arg0: string, arg1: object, arg2: import("./Resolver").FileSystemCallback<string | Buffer>) => void);
    readFileSync: (arg0: string, arg1: object) => string | Buffer;
    _readJsonBackend: OperationMergerBackend | CacheBackend;
    readJson: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<object>) => void) & ((arg0: string, arg1: object, arg2: import("./Resolver").FileSystemCallback<object>) => void);
    readJsonSync: (arg0: string, arg1: object) => object;
    _readlinkBackend: OperationMergerBackend | CacheBackend;
    readlink: ((arg0: string, arg1: import("./Resolver").FileSystemCallback<string | Buffer>) => void) & ((arg0: string, arg1: object, arg2: import("./Resolver").FileSystemCallback<string | Buffer>) => void);
    readlinkSync: (arg0: string, arg1: object) => string | Buffer;
    purge(what: any): void;
}
export type FileSystem = import("./Resolver").FileSystem;
export type SyncFileSystem = import("./Resolver").SyncFileSystem;
declare class OperationMergerBackend {
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
    constructor(duration: number, provider: any, syncProvider: any, providerContext: any);
    _duration: number;
    _provider: any;
    _syncProvider: any;
    _providerContext: any;
    _activeAsyncOperations: Map<string, ((arg0: Error, arg1: any) => void)[]>;
    _data: Map<string, {
        err: Error;
        result: any;
        level: Set<string>;
    }>;
    _levels: Set<string>[];
    _currentLevel: number;
    _tickInterval: number;
    _mode: 0 | 1 | 2;
    _timeout: NodeJS.Timeout | undefined;
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
export {};
