declare const path: any;
declare const DirectoryWatcher: any;
declare class WatcherManager {
    constructor(options: any);
    getDirectoryWatcher(directory: any): any;
    watchFile(p: any, startTime: any): any;
    watchDirectory(directory: any, startTime: any): any;
}
declare const watcherManagers: WeakMap<object, any>;
