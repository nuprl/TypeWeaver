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
declare const COMPILE: (options: any) => any;
declare function AsyncSeriesWaterfallHook(args: any[], Array: any, : any, any: any): any;
declare namespace AsyncSeriesWaterfallHook {
    var prototype: any;
}
