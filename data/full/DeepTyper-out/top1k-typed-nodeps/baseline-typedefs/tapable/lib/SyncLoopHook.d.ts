declare const Hook: any;
declare const HookCodeFactory: any;
declare class SyncLoopHookCodeFactory extends HookCodeFactory {
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
declare function SyncLoopHook(args?: any[], name?: any): any;
declare namespace SyncLoopHook {
    var prototype: any;
}
