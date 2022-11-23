declare var slice: (start?: number, end?: number) => any[];
declare function co(gen: GeneratorFunction): Promise<unknown>;
declare namespace co {
    var co: typeof globalThis.co;
    var wrap: (fn: Function) => {
        (): any;
        __generatorFunction__: Function;
    };
}
declare function toPromise(obj: any): any;
declare function thunkToPromise(fn: Function): Promise<unknown>;
declare function arrayToPromise(obj: Array<any>): Promise<any[]>;
declare function objectToPromise(obj: any): Promise<any>;
declare function isPromise(obj: any): boolean;
declare function isGenerator(obj: unknown): boolean;
declare function isGeneratorFunction(obj: object): boolean;
declare function isObject(val: unknown): boolean;
