declare const EventEmitter: string;
declare const fs: string;
declare const path: string;
declare const watchEventSource: string;
declare const EXISTANCE_ONLY_TIME_ENTRY: Function;
declare let FS_ACCURACY: number;
declare const IS_OSX: boolean;
declare const WATCHPACK_POLLING: number;
declare const FORCE_POLLING: string;
declare function withoutCase(str: string): string;
declare function needCalls(times: number, callback: Function): Function;
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
    watch(filePath: any, startTime: any): Watchpack;
    onWatchEvent(eventType: any, filename: any): void;
    onWatcherError(err: any): void;
    onStatsError(err: any): void;
    onScanError(err: any): void;
    onScanFinished(): void;
    onDirectoryRemoved(reason: any): void;
    watchInParentDirectory(): void;
    doScan(initial: any): void;
    getTimes(): object;
    collectTimeInfoEntries(fileTimestamps: any, directoryTimestamps: any): number;
    close(): void;
}
declare function fixupEntryAccuracy(entry: object): void;
declare function ensureFsAccuracy(mtime: number): void;
