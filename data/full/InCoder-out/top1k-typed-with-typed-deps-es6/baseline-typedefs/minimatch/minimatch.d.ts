declare const minimatch: {
    (p: any, pattern: any, options?: {}): any;
    sep: string;
    GLOBSTAR: typeof GLOBSTAR;
    filter(pattern: any, options?: {}): (p: any, i: any, list: any) => any;
    defaults(def: any): any | {
        (p: any, pattern: any, options: any): any;
        Minimatch: {
            new (pattern: any, options: any): {
                debug(): void;
                make(): void;
                parseNegate(): void;
                matchOne(file: any, pattern: any, partial: any): any;
                braceExpand(): any[];
                parse(pattern: any, isSub: any): any;
                makeRe(): any;
                match(f: any, partial?: any): any;
            };
            defaults(def: any): typeof Minimatch | any;
        };
        filter(pattern: any, options: any): (p: any, i: any, list: any) => any;
        defaults(options: any): any | any;
        makeRe(pattern: any, options: any): any;
        braceExpand(pattern: any, options: any): any[];
        match(list: any, pattern: any, options: any): any;
    };
    braceExpand(pattern: any, options: any): any[];
    makeRe(pattern: any, options: any): any;
    match(list: any, pattern: any, options?: {}): any;
    Minimatch: typeof Minimatch;
};
export default minimatch;
export default minimatch;
declare const GLOBSTAR: unique symbol;
declare class Minimatch {
    constructor(pattern: any, options: any);
    debug(): void;
    make(): void;
    parseNegate(): void;
    matchOne(file: any, pattern: any, partial: any): any;
    braceExpand(): any[];
    parse(pattern: any, isSub: any): any;
    makeRe(): any;
    match(f: any, partial?: any): any;
    static defaults(def: any): typeof Minimatch | {
        new (pattern: any, options: any): {
            debug(): void;
            make(): void;
            parseNegate(): void;
            matchOne(file: any, pattern: any, partial: any): any;
            braceExpand(): any[];
            parse(pattern: any, isSub: any): any;
            makeRe(): any;
            match(f: any, partial?: any): any;
        };
        defaults(def: any): typeof Minimatch | any;
    };
}
