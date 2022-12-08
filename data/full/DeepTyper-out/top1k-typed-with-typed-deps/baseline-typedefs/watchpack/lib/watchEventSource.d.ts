declare const fs: any;
declare const path: any;
declare const EventEmitter: any;
declare const reducePlan: any;
declare const IS_OSX: any;
declare const IS_WIN: any;
declare const SUPPORTS_RECURSIVE_WATCHING: any;
declare const watcherLimit: any;
declare const recursiveWatcherLogging: boolean;
declare let isBatch: boolean;
declare let watcherCount: number;
declare const pendingWatchers: any;
declare const recursiveWatchers: any;
declare const directWatchers: any;
declare const underlyingWatcher: any;
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
declare const createDirectWatcher: any;
declare const createRecursiveWatcher: any;
declare const execute: Promise<void>;
