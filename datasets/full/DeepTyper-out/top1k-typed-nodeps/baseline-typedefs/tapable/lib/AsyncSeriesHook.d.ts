declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncSeriesHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone }: {
        onError: any;
        onDone: any;
    }): any;
}
declare const factory: any;
declare const COMPILE: any;
declare function AsyncSeriesHook(args?: any[], name?: any): any;
declare namespace AsyncSeriesHook {
    var prototype: any;
}
