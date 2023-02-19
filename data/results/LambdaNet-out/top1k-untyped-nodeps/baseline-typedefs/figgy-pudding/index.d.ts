declare class FiggyPudding {
    constructor(specs: any, opts: any, providers: any);
    get(key: any): any[];
    get [Symbol.toStringTag](): string;
    forEach(fn: any, thisArg?: this): void;
    toJSON(): object;
    entries(_matcher: any): Generator<any[], void, unknown>;
    [Symbol.iterator](): Generator<any[], void, unknown>;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    concat(...moreConfig: any[]): FiggyPudding;
}
declare function BadKeyError(key: string): void;
declare function pudGet(pud: FiggyPudding, key: string, validate: boolean): any[];
declare function tryGet(key: string, p: object): object;
declare const proxyHandler: object;
declare function figgyPudding(specs: string, opts: Function): Function;
declare function reverse(arr: any[]): any[];
declare function entries(obj: object): any[];
