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
declare const factory: AsyncSeriesBailHookCodeFactory;
declare const COMPILE: (options: IOptions) => any;
declare function AsyncSeriesBailHook(args: any[], any: any, name: any, string: any): any;
declare namespace AsyncSeriesBailHook {
    var prototype: any;
}
