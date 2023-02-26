declare const fs: any;
declare const path: any;
declare const EventEmitter: any;
declare const reducePlan: any;
declare const IS_OSX: boolean;
declare const IS_WIN: boolean;
declare const SUPPORTS_RECURSIVE_WATCHING: boolean;
declare const watcherLimit: number;
declare const recursiveWatcherLogging: boolean;
declare let isBatch: boolean;
declare let watcherCount: number;
declare const pendingWatchers: Map<any, any>;
declare const recursiveWatchers: Map<any, any>;
declare const directWatchers: Map<any, any>;
declare const underlyingWatcher: Map<any, any>;
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
declare const createDirectWatcher: (filePath: any) => any;
declare const createRecursiveWatcher: (rootPath: any) => any;
declare const execute: () => void;
