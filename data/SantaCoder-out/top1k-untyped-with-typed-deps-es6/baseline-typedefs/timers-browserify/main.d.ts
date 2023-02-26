/// <reference types="node" />
export declare const setTimeout: () => any;
export declare const setInterval: () => any;
export declare const clearTimeout: (timeout: ITimeout) => void;
export declare const enroll: (item: any, msecs: number) => void;
export declare const unenroll: (item: IdleItem) => void;
export declare const _unrefActive: (item: any) => void;
import 'setimmediate';
export declare const setImmediate: typeof globalThis.setImmediate;
export declare const clearImmediate: typeof globalThis.clearImmediate;
