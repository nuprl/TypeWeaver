declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncParallelBailHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, onDone }: {
        onError: any;
        onResult: any;
        onDone: any;
    }): string;
}
declare const factory: AsyncParallelBailHookCodeFactory;
declare const COMPILE: (options: any) => any;
declare function AsyncParallelBailHook(args: any[], Array: any, : any, any: any): any;
declare namespace AsyncParallelBailHook {
    var prototype: any;
}
