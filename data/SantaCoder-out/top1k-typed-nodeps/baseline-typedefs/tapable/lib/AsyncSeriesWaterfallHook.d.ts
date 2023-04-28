declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncSeriesWaterfallHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, onDone }: {
        onError: any;
        onResult: any;
        onDone: any;
    }): any;
}
declare const factory: AsyncSeriesWaterfallHookCodeFactory;
declare const COMPILE: (options: HookMapOptions) => any;
declare function AsyncSeriesWaterfallHook(args: any[], any: any, []: Iterable<any>, name: any, string: any): any;
declare namespace AsyncSeriesWaterfallHook {
    var prototype: any;
}
