declare var asap: any;
declare function noop(): void;
declare var LAST_ERROR: any;
declare var IS_ERROR: {};
declare function getThen(obj: any): any;
declare function tryCallOne(fn: any, a: any): any;
declare function tryCallTwo(fn: any, a: any, b: any): any;
declare function Promise(fn: any): PromiseConstructor;
declare namespace Promise { }
declare function safeThen(self: any, onFulfilled: any, onRejected: any): any;
declare function handle(self: any, deferred: any): void;
declare function handleResolved(self: any, deferred: any): void;
declare function resolve(self: any, newValue: any): void;
declare function reject(self: any, newValue: any): void;
declare function finale(self: any): void;
declare function Handler(onFulfilled: any, onRejected: any, promise: any): any;
declare function doResolve(fn: any, promise: any): void;
