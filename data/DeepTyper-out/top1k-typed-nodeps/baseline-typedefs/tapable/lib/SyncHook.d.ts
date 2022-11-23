declare const Hook: any;
declare const HookCodeFactory: any;
declare class SyncHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone, rethrowIfPossible }: {
        onError: any;
        onDone: any;
        rethrowIfPossible: any;
    }): any;
}
declare const factory: any;
declare const TAP_ASYNC: any;
declare const TAP_PROMISE: any;
declare const COMPILE: any;
declare function SyncHook(args?: any[], name?: any): any;
declare namespace SyncHook {
    var prototype: any;
}
