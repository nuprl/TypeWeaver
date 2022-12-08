declare const Hook: any;
declare const HookCodeFactory: any;
declare class SyncHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone, rethrowIfPossible }: {
        onError: any;
        onDone: any;
        rethrowIfPossible: any;
    }): any;
}
declare const factory: SyncHookCodeFactory;
declare const TAP_ASYNC: () => never;
declare const TAP_PROMISE: () => never;
declare const COMPILE: (options: any) => any;
declare function SyncHook(args: any[], Array: any, : any, any: any): any;
declare namespace SyncHook {
    var prototype: any;
}
