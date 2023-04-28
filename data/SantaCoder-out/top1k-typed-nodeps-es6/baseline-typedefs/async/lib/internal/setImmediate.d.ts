/// <reference types="setimmediate" />
/// <reference types="node" />
export declare var hasQueueMicrotask: typeof queueMicrotask;
export declare var hasSetImmediate: typeof setImmediate;
export declare var hasNextTick: boolean;
export declare function fallback(fn: Function): void;
export declare function wrap(defer: Function): (fn: any, ...args: any[]) => any;
declare const _default: (fn: any, ...args: any[]) => any;
export default _default;
