export = DirectoryWatcher;
declare class DirectoryWatcher extends EventEmitter {
    constructor(watcherManager: any, directoryPath: any, options: any);
    watcherManager: any;
    options: any;
    path: any;
    /** @type {Map<string, { safeTime: number, timestamp: number }} */
    files: Map<string, {
        safeTime: number;
        timestamp: number;
    }>;
    /** @type {Map<string, number>} */
    filesWithoutCase: Map<string, number>;
    directories: Map<any, any>;
    lastWatchEvent: number;
    initialScan: boolean;
    ignored: any;
    nestedWatching: boolean;
    polledWatching: any;
    timeout: NodeJS.Timeout;
    initialScanRemoved: Set<any>;
    initialScanFinished: number;
    /** @type {Map<string, Set<Watcher>>} */
    watchers: Map<string, Set<Watcher>>;
    parentWatcher: any;
    refs: number;
    _activeEvents: Map<any, any>;
    closed: boolean;
    scanning: boolean;
    scanAgain: boolean;
    scanAgainInitial: boolean;
    createWatcher(): void;
    watcher: {
        close(): void;
        addListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        on(eventName: string | symbol, listener: (...args: any[]) => void): any;
        once(eventName: string | symbol, listener: (...args: any[]) => void): any;
        removeListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        off(eventName: string | symbol, listener: (...args: any[]) => void): any;
        removeAllListeners(event?: string | symbol): any;
        setMaxListeners(n: number): any;
        getMaxListeners(): number;
        listeners(eventName: string | symbol): Function[];
        rawListeners(eventName: string | symbol): Function[];
        emit(eventName: string | symbol, ...args: any[]): boolean;
        listenerCount(eventName: string | symbol): number;
        prependListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        prependOnceListener(eventName: string | symbol, listener: (...args: any[]) => void): any;
        eventNames(): (string | symbol)[];
    } | {
        close: () => void;
    };
    forEachWatcher(path: any, fn: any): void;
    setMissing(itemPath: any, initial: any, type: any): void;
    setFileTime(filePath: any, mtime: any, initial: any, ignoreWhenEqual: any, type: any): void;
    setDirectory(directoryPath: any, birthtime: any, initial: any, type: any): void;
    createNestedWatcher(directoryPath: any): void;
    setNestedWatching(flag: any): void;
    watch(filePath: any, startTime: any): Watcher;
    onWatchEvent(eventType: any, filename: any): void;
    onWatcherError(err: any): void;
    onStatsError(err: any): void;
    onScanError(err: any): void;
    onScanFinished(): void;
    onDirectoryRemoved(reason: any): void;
    watchInParentDirectory(): void;
    doScan(initial: any): void;
    getTimes(): any;
    collectTimeInfoEntries(fileTimestamps: any, directoryTimestamps: any): number;
    close(): void;
}
declare namespace DirectoryWatcher {
    export { EXISTANCE_ONLY_TIME_ENTRY };
}
import EventEmitter_1 = require("events");
import EventEmitter = EventEmitter_1.EventEmitter;
declare class Watcher extends EventEmitter {
    constructor(directoryWatcher: any, filePath: any, startTime: any);
    directoryWatcher: any;
    path: any;
    startTime: number;
    checkStartTime(mtime: any, initial: any): boolean;
    close(): void;
}
declare const EXISTANCE_ONLY_TIME_ENTRY: Readonly<{}>;
