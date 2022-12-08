export default class QuickLRU extends Map {
    constructor(options?: {});
    _emitEvictions(cache: any): void;
    _deleteIfExpired(key: any, item: any): any;
    _getOrDeleteIfExpired(key: any, item: any): any;
    _getItemValue(key: any, item: any): any;
    _peek(key: any, cache: any): any;
    _set(key: any, value: any): void;
    _moveToRecent(key: any, item: any): void;
    _entriesAscending(): Generator<any, void, unknown>;
    get(key: any): any;
    set(key: any, value: any, { maxAge }?: {
        maxAge?: any;
    }): void;
    has(key: any): boolean;
    peek(key: any): any;
    delete(key: any): any;
    clear(): void;
    resize(newSize: any): void;
    keys(): Generator<any, void, unknown>;
    values(): Generator<any, void, unknown>;
    [Symbol.iterator](): Generator<any[], void, unknown>;
    entriesDescending(): Generator<any[], void, unknown>;
    entriesAscending(): Generator<any[], void, unknown>;
    get size(): any;
    entries(): Generator<any[], void, unknown>;
    forEach(callbackFunction: any, thisArgument?: this): void;
    get [Symbol.toStringTag](): string;
}
