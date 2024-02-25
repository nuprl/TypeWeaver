declare function _exports(p: any, pattern: any, options?: {}): boolean;
declare namespace _exports {
    export const sep: string;
    export { GLOBSTAR };
    export function filter(pattern: any, options?: {}): (p: any, i: any, list: any) => boolean;
    export function defaults(def: any): any;
    export function braceExpand(pattern: any, options: any): any[];
    export function makeRe(pattern: any, options: any): boolean | RegExp;
    export function match(list: any, pattern: any, options?: {}): any;
    export { Minimatch };
}
export = _exports;
declare const GLOBSTAR: unique symbol;
declare class Minimatch {
    static defaults(def: any): any;
    constructor(pattern: any, options: any);
    options: any;
    set: any[];
    pattern: any;
    windowsPathsNoEscape: boolean;
    regexp: boolean | RegExp;
    negate: boolean;
    comment: boolean;
    empty: boolean;
    partial: boolean;
    debug(): void;
    make(): void;
    globSet: any[];
    globParts: any[];
    parseNegate(): void;
    matchOne(file: any, pattern: any, partial: any): any;
    braceExpand(): any[];
    parse(pattern: any, isSub: any): any;
    makeRe(): boolean | RegExp;
    match(f: any, partial?: boolean): boolean;
}
