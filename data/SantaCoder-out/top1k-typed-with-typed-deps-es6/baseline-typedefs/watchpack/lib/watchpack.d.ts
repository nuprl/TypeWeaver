/// <reference types="node" />
import { EventEmitter } from 'events';
declare class Watchpack extends EventEmitter {
    constructor(options: any);
    watch(arg1: any, arg2: any, arg3: any): void;
    close(): void;
    pause(): void;
    getTimes(): any;
    getTimeInfoEntries(): Map<any, any>;
    collectTimeInfoEntries(fileTimestamps: any, directoryTimestamps: any): void;
    getAggregated(): {
        changes: any;
        removals: any;
    };
    _onChange(item: any, mtime: any, file: any, type: any): void;
    _onRemove(item: any, file: any, type: any): void;
    _onTimeout(): void;
}
export default Watchpack;
