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
    concat(...moreConfig: any[]): FiggyPudding;
}
declare function BadKeyError(key: string): void;
declare function pudGet(pud: any, key: string, validate: any): any;
declare function tryGet(key: string, p: any): any;
declare const proxyHandler: any;
declare function figgyPudding(specs: any, opts: any): any;
declare function reverse(arr: any[]): any[];
declare function entries(obj: any): any;
