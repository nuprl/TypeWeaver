declare const nextTick: Function;
declare const dirname: Function;
declare const runCallbacks: Function;
declare class OperationMergerBackend {
    constructor(provider: any, syncProvider: any, providerContext: any);
    purge(): void;
    purgeParent(): void;
}
declare const STORAGE_MODE_IDLE: number;
declare const STORAGE_MODE_SYNC: number;
declare const STORAGE_MODE_ASYNC: number;
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
declare const createBackend: Function;
