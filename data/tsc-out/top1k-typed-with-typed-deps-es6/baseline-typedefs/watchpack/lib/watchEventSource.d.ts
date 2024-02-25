export function watch(filePath: any): Watcher;
export function batch(fn: any): void;
export function getNumberOfWatchers(): number;
declare class Watcher extends EventEmitter {
    close(): void;
}
import { EventEmitter } from "events";
export {};
