declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncParallelHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone }: {
        onError: any;
        onDone: any;
    }): any;
}
declare const factory: AsyncParallelHookCodeFactory;
declare const COMPILE: (options: any) => any;
declare function AsyncParallelHook(args: any[], any: any, []: Iterable<any>, name: any, string: any): any;
declare namespace AsyncParallelHook {
    var prototype: any;
}
