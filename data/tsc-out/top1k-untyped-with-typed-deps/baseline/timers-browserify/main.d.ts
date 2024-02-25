export function setTimeout(...args: any[]): Timeout;
export function setInterval(...args: any[]): Timeout;
export function clearTimeout(timeout: any): void;
export function clearInterval(timeout: any): void;
export function enroll(item: any, msecs: any): void;
export function unenroll(item: any): void;
export function _unrefActive(item: any): void;
export function active(item: any): void;
export const setImmediate: any;
export const clearImmediate: any;
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
