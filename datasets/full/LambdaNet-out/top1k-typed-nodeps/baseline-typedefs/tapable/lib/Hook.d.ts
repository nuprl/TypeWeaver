declare const util: string;
declare const deprecateContext: Function;
declare const CALL_DELEGATE: Function;
declare const CALL_ASYNC_DELEGATE: Function;
declare const PROMISE_DELEGATE: Function;
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
        tap: (opt: string, fn: number) => void;
        tapAsync: (opt: string, fn: number) => void;
        tapPromise: (opt: string, fn: number) => void;
        intercept: (interceptor: string) => void;
        isUsed: () => boolean;
        withOptions: (opt: string) => any;
    };
    isUsed(): boolean;
    intercept(interceptor: any): void;
    _resetCompilation(): void;
    _insert(item: any): void;
}
