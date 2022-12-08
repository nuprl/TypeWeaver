declare class HookCodeFactory {
    constructor(config: any);
    create(options: any): any;
    setup(instance: any, options: any): void;
    init(options: any): void;
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
