declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncParallelBailHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, onDone }: {
        onError: any;
        onResult: any;
        onDone: any;
    }): string;
}
declare const factory: any;
declare const COMPILE: any;
declare function AsyncParallelBailHook(args?: any[], name?: any): any;
declare namespace AsyncParallelBailHook {
    var prototype: any;
}
