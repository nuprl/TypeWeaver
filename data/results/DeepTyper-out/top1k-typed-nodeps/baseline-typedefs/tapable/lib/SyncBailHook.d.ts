declare const Hook: any;
declare const HookCodeFactory: any;
declare class SyncBailHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, resultReturns, onDone, rethrowIfPossible }: {
        onError: any;
        onResult: any;
        resultReturns: any;
        onDone: any;
        rethrowIfPossible: any;
    }): any;
}
declare const factory: any;
declare const TAP_ASYNC: any;
declare const TAP_PROMISE: any;
declare const COMPILE: any;
declare function SyncBailHook(args?: any[], name?: any): any;
declare namespace SyncBailHook {
    var prototype: any;
}
