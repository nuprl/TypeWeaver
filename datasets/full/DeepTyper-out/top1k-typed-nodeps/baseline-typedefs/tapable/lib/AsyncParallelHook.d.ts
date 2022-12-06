declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncParallelHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone }: {
        onError: any;
        onDone: any;
    }): any;
}
declare const factory: any;
declare const COMPILE: any;
declare function AsyncParallelHook(args?: any[], name?: any): any;
declare namespace AsyncParallelHook {
    var prototype: any;
}
