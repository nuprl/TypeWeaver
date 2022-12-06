declare const fs: string;
declare const path: string;
declare const EventEmitter: any;
declare const reducePlan: Function;
declare const IS_OSX: boolean;
declare const IS_WIN: boolean;
declare const SUPPORTS_RECURSIVE_WATCHING: number;
declare const watcherLimit: number;
declare const recursiveWatcherLogging: RecursiveWatcher;
declare let isBatch: boolean;
declare let watcherCount: number;
declare const pendingWatchers: Map;
declare const recursiveWatchers: Map;
declare const directWatchers: Map;
declare const underlyingWatcher: Map;
declare class DirectWatcher {
    constructor(filePath: any);
    add(watcher: any): void;
    remove(watcher: any): void;
    getWatchers(): any;
}
declare class RecursiveWatcher {
    constructor(rootPath: any);
    add(filePath: any, watcher: any): void;
    remove(watcher: any): void;
    getWatchers(): any;
}
declare class Watcher extends EventEmitter {
    close(): void;
}
declare const createDirectWatcher: Function;
declare const createRecursiveWatcher: Function;
declare const execute: Function;
