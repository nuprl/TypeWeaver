declare const Hook: any;
declare class MultiHook {
    constructor(hooks: any, name?: any);
    tap(options: any, fn: any): void;
    tapAsync(options: any, fn: any): void;
    tapPromise(options: any, fn: any): void;
    isUsed(): boolean;
    intercept(interceptor: any): void;
    withOptions(options: any): MultiHook;
}
