export default HookCodeFactory;
declare class HookCodeFactory {
    constructor(config: any);
    config: any;
    options: {
        type: "sync" | "promise" | "async";
        taps: Array<typeof Tap>;
        interceptors: Array<Interceptor>;
    };
    _args: any;
    create(options: any): Function;
    setup(instance: any, options: any): void;
    /**
     * @param {{ type: "sync" | "promise" | "async", taps: Array<Tap>, interceptors: Array<Interceptor> }} options
     */
    init(options: {
        type: "sync" | "promise" | "async";
        taps: Array<typeof Tap>;
        interceptors: Array<Interceptor>;
    }): void;
    deinit(): void;
    contentWithInterceptors(options: any): any;
    header(): string;
    needContext(): boolean;
    callTap(tapIndex: any, { onError, onResult, onDone, rethrowIfPossible }: {
        onError: any;
        onResult: any;
        onDone: any;
        rethrowIfPossible: any;
    }): string;
    callTapsSeries({ onError, onResult, resultReturns, onDone, doneReturns, rethrowIfPossible }: {
        onError: any;
        onResult: any;
        resultReturns: any;
        onDone: any;
        doneReturns: any;
        rethrowIfPossible: any;
    }): any;
    callTapsLooping({ onError, onDone, rethrowIfPossible }: {
        onError: any;
        onDone: any;
        rethrowIfPossible: any;
    }): any;
    callTapsParallel({ onError, onResult, onDone, rethrowIfPossible, onTap }: {
        onError: any;
        onResult: any;
        onDone: any;
        rethrowIfPossible: any;
        onTap?: (i: any, run: any) => any;
    }): any;
    args({ before, after }?: {
        before: any;
        after: any;
    }): any;
    getTapFn(idx: any): string;
    getTap(idx: any): string;
    getInterceptor(idx: any): string;
}
