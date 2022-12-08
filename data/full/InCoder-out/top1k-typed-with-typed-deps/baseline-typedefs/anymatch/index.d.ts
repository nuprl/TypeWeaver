declare const picomatch: any;
declare const normalizePath: any;
declare const BANG = "!";
declare const DEFAULT_OPTIONS: {
    returnIndex: boolean;
};
declare const arrify: (item: any) => any[];
declare const createPattern: (matcher: any, options: any) => any;
declare const matchPatterns: (patterns: any, negPatterns: any, args: any, returnIndex: any) => number | boolean;
declare const anymatch: {
    (matchers: any, testString: any, options?: {
        returnIndex: boolean;
    }): number | boolean | ((testString: any, ri?: boolean) => number | boolean);
    default: any;
};
