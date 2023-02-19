declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncSeriesWaterfallHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, onDone }: {
        onError: any;
        onResult: any;
        onDone: any;
    }): any;
}
declare const factory: any;
declare const COMPILE: any;
declare function AsyncSeriesWaterfallHook(args?: any[], name?: any): any;
declare namespace AsyncSeriesWaterfallHook {
    var prototype: any;
}
