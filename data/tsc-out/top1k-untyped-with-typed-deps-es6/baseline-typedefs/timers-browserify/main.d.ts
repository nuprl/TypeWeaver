export function setTimeout(...args: any[]): Timeout;
export function setInterval(...args: any[]): Timeout;
export function clearTimeout(timeout: any): void;
export function enroll(item: any, msecs: any): void;
export function unenroll(item: any): void;
export function _unrefActive(item: any): void;
export const setImmediate: typeof globalThis.setImmediate;
export const clearImmediate: typeof globalThis.clearImmediate;
declare function Timeout(id: any, clearFn: any): void;
declare class Timeout {
    constructor(id: any, clearFn: any);
    _id: any;
    _clearFn: any;
    unref: () => void;
    ref(): void;
    close(): void;
}
export {};
