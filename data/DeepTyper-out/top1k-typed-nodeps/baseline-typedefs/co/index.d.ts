declare var slice: any[];
declare function co(gen: any): any;
declare namespace co {
    var co: typeof globalThis.co;
    var wrap: (fn: Function) => {
        (): Promise<any>;
        __generatorFunction__: Function;
    };
}
declare function toPromise(obj: any): any;
declare function thunkToPromise(fn: any): any;
declare function arrayToPromise(obj: any): any;
declare function objectToPromise(obj: any): any;
declare function isPromise(obj: any): boolean;
declare function isGenerator(obj: any): boolean;
declare function isGeneratorFunction(obj: any): boolean;
declare function isObject(val: any): boolean;
