declare var process: {};
declare var cachedSetTimeout: any;
declare var cachedClearTimeout: any;
declare function defaultSetTimeout(): void;
declare function defaultClearTimeout(): void;
declare function runTimeout(fun: any): any;
declare function runClearTimeout(marker: any): any;
declare var queue: any[];
declare var draining: boolean;
declare var currentQueue: any;
declare var queueIndex: number;
declare function cleanUpNextTick(): void;
declare function drainQueue(): void;
declare function Item(fun: Function, array: any[]): void;
declare function noop(): void;
