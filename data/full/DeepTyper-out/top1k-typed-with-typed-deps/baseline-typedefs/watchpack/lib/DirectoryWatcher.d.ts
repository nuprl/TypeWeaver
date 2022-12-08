declare const EventEmitter: any;
declare const fs: any;
declare const path: any;
declare const watchEventSource: any;
declare const EXISTANCE_ONLY_TIME_ENTRY: any;
declare let FS_ACCURACY: number;
declare const IS_OSX: any;
declare const WATCHPACK_POLLING: any;
declare const FORCE_POLLING: string;
declare function withoutCase(str: string): string;
declare function needCalls(times: number, callback: any): void;
declare class Watcher extends EventEmitter {
    constructor(directoryWatcher: any, filePath: any, startTime: any);
    checkStartTime(mtime: any, initial: any): boolean;
    close(): void;
}
declare class DirectoryWatcher extends EventEmitter {
    constructor(watcherManager: any, directoryPath: any, options: any);
    createWatcher(): void;
    forEachWatcher(path: any, fn: any): void;
    setMissing(itemPath: any, initial: any, type: any): void;
    setFileTime(filePath: any, mtime: any, initial: any, ignoreWhenEqual: any, type: any): void;
    setDirectory(directoryPath: any, birthtime: any, initial: any, type: any): void;
    createNestedWatcher(directoryPath: any): void;
    setNestedWatching(flag: any): void;
    watch(filePath: any, startTime: any): any;
    onWatchEvent(eventType: any, filename: any): void;
    onWatcherError(err: any): void;
    onStatsError(err: any): void;
    onScanError(err: any): void;
    onScanFinished(): void;
    onDirectoryRemoved(reason: any): void;
    watchInParentDirectory(): void;
    doScan(initial: any): void;
    getTimes(): any;
    collectTimeInfoEntries(fileTimestamps: any, directoryTimestamps: any): any;
    close(): void;
}
declare function fixupEntryAccuracy(entry: any): void;
declare function ensureFsAccuracy(mtime: number): void;
