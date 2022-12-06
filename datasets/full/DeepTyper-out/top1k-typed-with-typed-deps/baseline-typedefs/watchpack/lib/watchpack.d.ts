declare const getWatcherManager: any;
declare const LinkResolver: any;
declare const EventEmitter: any;
declare const globToRegExp: any;
declare const watchEventSource: any;
declare const EMPTY_ARRAY: any[];
declare const EMPTY_OPTIONS: {};
declare function addWatchersToSet(watchers: any, set: any): void;
declare const stringToRegexp: any;
declare const ignoredToFunction: any;
declare const normalizeOptions: any;
declare const normalizeCache: any;
declare const cachedNormalizeOptions: any;
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
    getTimes(): any;
    getTimeInfoEntries(): any;
    collectTimeInfoEntries(fileTimestamps: any, directoryTimestamps: any): void;
    getAggregated(): {
        changes: Set<any>;
        removals: any;
    };
    _onChange(item: any, mtime: any, file: any, type: any): void;
    _onRemove(item: any, file: any, type: any): void;
    _onTimeout(): void;
}
