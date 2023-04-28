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
declare const COMPILE: (options: HookMapOptions) => any;
declare function AsyncParallelBailHook(args: any[], any: any, []: Iterable<any>, name: any, string: any): any;
declare namespace AsyncParallelBailHook {
    var prototype: any;
}
