declare const path: string;
declare const DirectoryWatcher: DirectoryWatcher;
declare class WatcherManager {
    constructor(options: any);
    getDirectoryWatcher(directory: any): Watcher;
    watchFile(p: any, startTime: any): any;
    watchDirectory(directory: any, startTime: any): any;
}
declare const watcherManagers: Error;
