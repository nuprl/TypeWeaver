declare const minimatch: (p: any, pattern: any, options?: {}) => any;
declare const path: any;
declare const GLOBSTAR: unique symbol;
declare const expand: any;
declare const plTypes: {
    '!': {
        open: string;
        close: string;
    };
    '?': {
        open: string;
        close: string;
    };
    '+': {
        open: string;
        close: string;
    };
    '*': {
        open: string;
        close: string;
    };
    '@': {
        open: string;
        close: string;
    };
};
declare const qmark = "[^/]";
declare const star: string;
declare const twoStarDot = "(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?";
declare const twoStarNoDot = "(?:(?!(?:\\/|^)\\.).)*?";
declare const charSet: (s: any) => any;
declare const reSpecials: any;
declare const addPatternStartSet: any;
declare const slashSplit: RegExp;
declare const ext: (a: any, b?: {}) => {};
declare const braceExpand: (pattern: any, options?: {}) => any;
declare const MAX_PATTERN_LENGTH: number;
declare const assertValidPattern: (pattern: any) => void;
declare const SUBPARSE: unique symbol;
declare const globUnescape: (s: any) => any;
declare const regExpEscape: (s: any) => any;
declare class Minimatch {
    constructor(pattern: any, options: any);
    debug(): void;
    make(): void;
    parseNegate(): void;
    matchOne(file: any, pattern: any, partial: any): any;
    braceExpand(): any;
    parse(pattern: any, isSub: any): any;
    makeRe(): any;
    match(f: any, partial?: any): any;
    static defaults(def: any): any;
}
