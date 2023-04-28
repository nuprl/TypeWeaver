declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncSeriesLoopHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone }: {
        onError: any;
        onDone: any;
    }): any;
}
declare const factory: AsyncSeriesLoopHookCodeFactory;
declare const COMPILE: (options: any) => any;
declare function AsyncSeriesLoopHook(args: any[], any: any, []: Iterable<any>, name: any, string: any): any;
declare namespace AsyncSeriesLoopHook {
    var prototype: any;
}
