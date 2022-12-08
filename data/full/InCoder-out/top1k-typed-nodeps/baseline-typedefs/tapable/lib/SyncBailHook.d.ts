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
declare const factory: SyncBailHookCodeFactory;
declare const TAP_ASYNC: () => never;
declare const TAP_PROMISE: () => never;
declare const COMPILE: (options: any) => any;
declare function SyncBailHook(args: any[], Array: any, : any, any: any): any;
declare namespace SyncBailHook {
    var prototype: any;
}
