declare const Hook: any;
declare const HookCodeFactory: any;
declare class SyncWaterfallHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, resultReturns, rethrowIfPossible }: {
        onError: any;
        onResult: any;
        resultReturns: any;
        rethrowIfPossible: any;
    }): any;
}
declare const factory: any;
declare const TAP_ASYNC: any;
declare const TAP_PROMISE: any;
declare const COMPILE: any;
declare function SyncWaterfallHook(args?: any[], name?: any): any;
declare namespace SyncWaterfallHook {
    var prototype: any;
}
