declare const Hook: any;
declare const HookCodeFactory: any;
declare class AsyncSeriesBailHookCodeFactory extends HookCodeFactory {
    content({ onError, onResult, resultReturns, onDone }: {
        onError: any;
        onResult: any;
        resultReturns: any;
        onDone: any;
    }): any;
}
declare const factory: any;
declare const COMPILE: any;
declare function AsyncSeriesBailHook(args?: any[], name?: any): any;
declare namespace AsyncSeriesBailHook {
    var prototype: any;
}
