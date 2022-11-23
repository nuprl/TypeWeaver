declare const util: any;
declare const deprecateContext: any;
declare const CALL_DELEGATE: void;
declare const CALL_ASYNC_DELEGATE: any;
declare const PROMISE_DELEGATE: any;
declare class Hook {
    constructor(args?: any[], name?: any);
    compile(options: any): void;
    _createCall(type: any): void;
    _tap(type: any, options: any, fn: any): void;
    tap(options: any, fn: any): void;
    tapAsync(options: any, fn: any): void;
    tapPromise(options: any, fn: any): void;
    _runRegisterInterceptors(options: any): any;
    withOptions(options: any): {
        name: any;
        tap: (opt: any, fn: any) => void;
        tapAsync: (opt: any, fn: any) => void;
        tapPromise: (opt: any, fn: any) => void;
        intercept: (interceptor: any) => void;
        isUsed: () => boolean;
        withOptions: (opt: any) => any;
    };
    isUsed(): boolean;
    intercept(interceptor: any): void;
    _resetCompilation(): void;
    _insert(item: any): void;
}
