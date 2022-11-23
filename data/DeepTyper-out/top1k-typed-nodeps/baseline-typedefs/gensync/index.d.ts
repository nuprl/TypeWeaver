declare const GENSYNC_START: symbol;
declare const GENSYNC_SUSPEND: unique symbol;
declare const GENSYNC_EXPECTED_START = "GENSYNC_EXPECTED_START";
declare const GENSYNC_EXPECTED_SUSPEND: RegExp;
declare const GENSYNC_OPTIONS_ERROR: RegExp;
declare const GENSYNC_RACE_NONEMPTY: RegExp;
declare const GENSYNC_ERRBACK_NO_CALLBACK: RegExp;
declare function makeFunctionAPI(genFn: IterableIterator<number>): any;
declare function assertTypeof(type: any, name: string, value: any, allowUndefined: boolean): void;
declare function makeError(msg: string, code: string): any;
declare function newGenerator({ name, arity, sync, async, errback }: {
    name: any;
    arity: any;
    sync: any;
    async: any;
    errback: any;
}): void;
declare function wrapGenerator(genFn: IterableIterator<number>): any;
declare function buildOperation({ name, arity, sync, async }: {
    name: any;
    arity: any;
    sync: any;
    async: any;
}): void;
declare function evaluateSync(gen: any): any;
declare function evaluateAsync(gen: any, resolve: any, reject: any): void;
declare function assertStart(value: any, gen: any): void;
declare function assertSuspend({ value, done }: {
    value: any;
    done: any;
}, gen: any): void;
declare function throwError(gen: any, err: any): void;
declare function isIterable(value: any): boolean;
declare function setFunctionMetadata(name: string, arity: any, fn: any): void;
