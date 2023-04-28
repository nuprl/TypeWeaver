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
declare const COMPILE: (options: HookCompileOptions) => any;
declare function SyncLoopHook(args: any[], any: any, []: Iterable<any>, name: any, string: any): any;
declare namespace SyncLoopHook {
    var prototype: any;
}
