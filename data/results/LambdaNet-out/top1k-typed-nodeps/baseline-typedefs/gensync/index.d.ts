declare const GENSYNC_START: string;
declare const GENSYNC_SUSPEND: any[];
declare const GENSYNC_EXPECTED_START: string;
declare const GENSYNC_EXPECTED_SUSPEND: string;
declare const GENSYNC_OPTIONS_ERROR: string;
declare const GENSYNC_RACE_NONEMPTY: string;
declare const GENSYNC_ERRBACK_NO_CALLBACK: string;
declare function makeFunctionAPI(genFn: Function): object;
declare function assertTypeof(type: string, name: string, value: string, allowUndefined: boolean): void;
declare function makeError(msg: string, code: string): object;
declare function newGenerator({ name, arity, sync, async, errback }: {
    name: any;
    arity: any;
    sync: any;
    async: any;
    errback: any;
}): void;
declare function wrapGenerator(genFn: any[]): string;
declare function buildOperation({ name, arity, sync, async }: {
    name: any;
    arity: any;
    sync: any;
    async: any;
}): void;
declare function evaluateSync(gen: object): object;
declare function evaluateAsync(gen: object, resolve: Function, reject: string): void;
declare function assertStart(value: string, gen: string): void;
declare function assertSuspend({ value, done }: {
    value: any;
    done: any;
}, gen: any): void;
declare function throwError(gen: any[], err: Function): void;
declare function isIterable(value: object): boolean;
declare function setFunctionMetadata(name: string, arity: string, fn: string): any[];
