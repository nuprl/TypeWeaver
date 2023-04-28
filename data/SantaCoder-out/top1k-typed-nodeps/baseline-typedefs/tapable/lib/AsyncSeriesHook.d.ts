declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncSeriesHookCodeFactory extends HookCodeFactory {
    content({ onError, onDone }: {
        onError: any;
        onDone: any;
    }): any;
}
declare const factory: AsyncSeriesHookCodeFactory;
declare const COMPILE: (options: any) => any;
declare function AsyncSeriesHook(args: any[], any: any, []: Iterable<any>, name: any, string: any): any;
declare namespace AsyncSeriesHook {
    var prototype: any;
}
