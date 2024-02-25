export default Watchpack;
declare class Watchpack extends EventEmitter {
    constructor(options: any);
    options: any;
    aggregateTimeout: any;
    watcherOptions: any;
    watcherManager: any;
    fileWatchers: Map<any, any>;
    directoryWatchers: Map<any, any>;
    _missing: Set<any>;
    startTime: any;
    paused: boolean;
    aggregatedChanges: Set<any>;
    aggregatedRemovals: Set<any>;
    aggregateTimer: NodeJS.Timeout;
    _onTimeout(): void;
    watch(arg1: any, arg2: any, arg3: any): void;
    close(): void;
    pause(): void;
    getTimes(): any;
    getTimeInfoEntries(): Map<any, any>;
    collectTimeInfoEntries(fileTimestamps: any, directoryTimestamps: any): void;
    getAggregated(): {
        changes: Set<any>;
        removals: Set<any>;
    };
    _onChange(item: any, mtime: any, file: any, type: any): void;
    _onRemove(item: any, file: any, type: any): void;
}
import { EventEmitter } from "events";
