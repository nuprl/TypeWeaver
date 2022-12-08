declare var slice: Function;
declare function co(gen: object): Promise;
declare namespace co {
    var co: typeof globalThis.co;
    var wrap: (fn: Function) => {
        (): any;
        __generatorFunction__: Function;
    };
}
declare function toPromise(obj: string): string;
declare function thunkToPromise(fn: Function): Promise;
declare function arrayToPromise(obj: any[]): Promise;
declare function objectToPromise(obj: object): Promise;
declare function isPromise(obj: Promise): boolean;
declare function isGenerator(obj: object): boolean;
declare function isGeneratorFunction(obj: object): boolean;
declare function isObject(val: object): boolean;
