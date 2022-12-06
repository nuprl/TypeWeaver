/// <reference types="node" />
import { EventEmitter } from 'events';
declare class Watcher extends EventEmitter {
    close(): void;
}
export declare const watch: (filePath: any) => Watcher;
export declare const batch: (fn: any) => void;
export declare const getNumberOfWatchers: () => number;
export {};
