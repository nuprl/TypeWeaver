declare const nextTick: any;
declare const dirname: (path: any) => any;
declare const runCallbacks: (callbacks: any, err: any, result: any) => void;
declare class OperationMergerBackend {
    constructor(provider: any, syncProvider: any, providerContext: any);
    purge(): void;
    purgeParent(): void;
}
declare const STORAGE_MODE_IDLE = 0;
declare const STORAGE_MODE_SYNC = 1;
declare const STORAGE_MODE_ASYNC = 2;
declare class CacheBackend {
    constructor(duration: any, provider: any, syncProvider: any, providerContext: any);
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
declare const createBackend: (duration: any, provider: any, syncProvider: any, providerContext: any) => OperationMergerBackend | CacheBackend;
