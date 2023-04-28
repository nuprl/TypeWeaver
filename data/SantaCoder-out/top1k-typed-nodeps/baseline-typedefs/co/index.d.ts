declare var slice: (start?: number, end?: number) => any[];
declare function co(gen: Generator): Promise<unknown>;
declare namespace co {
    var co: typeof globalThis.co;
    var wrap: (fn: Function) => {
        (): any;
        __generatorFunction__: Function;
    };
}
declare function toPromise(obj: any): any;
declare function thunkToPromise(fn: Function): Promise<unknown>;
declare function arrayToPromise(obj: any): Promise<any[]>;
declare function objectToPromise(obj: any): Promise<any>;
declare function isPromise(obj: any): boolean;
declare function isGenerator(obj: any): boolean;
declare function isGeneratorFunction(obj: any): boolean;
declare function isObject(val: any): boolean;
