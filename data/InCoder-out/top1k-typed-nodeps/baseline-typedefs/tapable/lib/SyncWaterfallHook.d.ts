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
declare const factory: SyncWaterfallHookCodeFactory;
declare const TAP_ASYNC: () => never;
declare const TAP_PROMISE: () => never;
declare const COMPILE: (options: any) => any;
declare function SyncWaterfallHook(args: any[], Array: any, : any, any: any): any;
declare namespace SyncWaterfallHook {
    var prototype: any;
}
