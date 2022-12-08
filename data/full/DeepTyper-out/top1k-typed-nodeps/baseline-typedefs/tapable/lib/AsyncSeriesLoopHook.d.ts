declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncSeriesLoopHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone }: {
        onError: any;
        onDone: any;
    }): any;
}
declare const factory: any;
declare const COMPILE: any;
declare function AsyncSeriesLoopHook(args?: any[], name?: any): any;
declare namespace AsyncSeriesLoopHook {
    var prototype: any;
}
