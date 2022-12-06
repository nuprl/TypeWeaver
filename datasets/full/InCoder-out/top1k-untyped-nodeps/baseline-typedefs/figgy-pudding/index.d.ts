declare class FiggyPudding {
    constructor(specs: any, opts: any, providers: any);
    get(key: any): any;
    get [Symbol.toStringTag](): string;
    forEach(fn: any, thisArg?: this): void;
    toJSON(): {};
    entries(_matcher: any): Generator<any[], void, unknown>;
    [Symbol.iterator](): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    concat(...moreConfig: any[]): any;
}
declare function BadKeyError(key: any): void;
declare function pudGet(pud: any, key: any, validate: any): any;
declare function tryGet(key: string | number, p: any): any;
declare const proxyHandler: {
    has(obj: any, prop: any): boolean;
    ownKeys(obj: any): string[];
    get(obj: any, prop: any): any;
    set(obj: any, prop: any, value: any): boolean;
    deleteProperty(): never;
};
declare function figgyPudding(specs: any, opts: any): (...providers: Provider[]) => any;
declare function reverse(arr: number[]): any[];
declare function entries(obj: any): any[][];
