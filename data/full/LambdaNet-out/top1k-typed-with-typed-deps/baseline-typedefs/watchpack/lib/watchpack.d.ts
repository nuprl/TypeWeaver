declare const getWatcherManager: Function;
declare const LinkResolver: any[];
declare const EventEmitter: string;
declare const globToRegExp: Function;
declare const watchEventSource: string;
declare const EMPTY_ARRAY: any[];
declare const EMPTY_OPTIONS: Function;
declare function addWatchersToSet(watchers: any[], set: RecursiveWatcher): void;
declare const stringToRegexp: Function;
declare const ignoredToFunction: Function;
declare const normalizeOptions: Function;
declare const normalizeCache: Error;
declare const cachedNormalizeOptions: Function;
declare class WatchpackFileWatcher {
    constructor(watchpack: any, watcher: any, files: any);
    update(files: any): void;
    close(): void;
}
declare class WatchpackDirectoryWatcher {
    constructor(watchpack: any, watcher: any, directories: any);
    update(directories: any): void;
    close(): void;
}
declare class Watchpack extends EventEmitter {
    constructor(options: any);
    watch(arg1: any, arg2: any, arg3: any): void;
    close(): void;
    pause(): void;
    getTimes(): object;
    getTimeInfoEntries(): any;
    collectTimeInfoEntries(fileTimestamps: any, directoryTimestamps: any): void;
    getAggregated(): {
        changes: Function;
        removals: number;
    };
    _onChange(item: any, mtime: any, file: any, type: any): void;
    _onRemove(item: any, file: any, type: any): void;
    _onTimeout(): void;
}
