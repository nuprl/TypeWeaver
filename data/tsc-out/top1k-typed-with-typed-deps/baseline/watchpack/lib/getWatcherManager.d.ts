declare function _exports(options: object): WatcherManager;
declare namespace _exports {
    export { WatcherManager };
}
export = _exports;
declare class WatcherManager {
    constructor(options: any);
    options: any;
    directoryWatchers: Map<any, any>;
    getDirectoryWatcher(directory: any): any;
    watchFile(p: any, startTime: any): any;
    watchDirectory(directory: any, startTime: any): any;
}
