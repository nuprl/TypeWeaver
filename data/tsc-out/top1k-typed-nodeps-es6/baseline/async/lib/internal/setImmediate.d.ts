export function fallback(fn: any): void;
export function wrap(defer: any): (fn: any, ...args: any[]) => any;
export const hasQueueMicrotask: typeof queueMicrotask;
export const hasSetImmediate: typeof setImmediate;
export const hasNextTick: boolean;
declare function _default(fn: any, ...args: any[]): any;
export default _default;
