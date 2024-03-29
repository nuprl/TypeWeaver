declare const Hook: any;
declare const HookCodeFactory: any;
declare class SyncLoopHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone, rethrowIfPossible }: {
        onError: any;
        onDone: any;
        rethrowIfPossible: any;
    }): any;
}
declare const factory: SyncLoopHookCodeFactory;
declare const TAP_ASYNC: () => never;
declare const TAP_PROMISE: () => never;
declare const COMPILE: (options: any) => any;
declare function SyncLoopHook(args: any[], Array: any, : any, any: any): any;
declare namespace SyncLoopHook {
    var prototype: any;
}
