declare var asap: Function;
declare function noop(): void;
declare var LAST_ERROR: any[];
declare var IS_ERROR: number;
declare function getThen(obj: Promise): any[];
declare function tryCallOne(fn: Function, a: string): void;
declare function tryCallTwo(fn: Function, a: string, b: number): void;
declare function Promise(fn: string): void;
declare namespace Promise { }
declare function safeThen(self: object, onFulfilled: number, onRejected: number): Promise;
declare function handle(self: HTMLElement, deferred: any[]): void;
declare function handleResolved(self: HTMLElement, deferred: HTMLElement): void;
declare function resolve(self: object, newValue: string): string;
declare function reject(self: object, newValue: number): void;
declare function finale(self: HTMLElement): void;
declare function Handler(onFulfilled: string, onRejected: string, promise: object): void;
declare function doResolve(fn: string, promise: object): void;
