declare function makeArray(subject: string): string[] | (string & any[]);
declare const EMPTY = "";
declare const SPACE = " ";
declare const ESCAPE = "\\";
declare const REGEX_TEST_BLANK_LINE: RegExp;
declare const REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION: RegExp;
declare const REGEX_REPLACE_LEADING_EXCAPED_HASH: RegExp;
declare const REGEX_SPLITALL_CRLF: RegExp;
declare const REGEX_TEST_INVALID_PATH: RegExp;
declare const SLASH = "/";
declare const KEY_IGNORE: string | symbol;
declare const define: (object: any, key: any, value: any) => any;
declare const REGEX_REGEXP_RANGE: RegExp;
declare const RETURN_FALSE: () => boolean;
declare const sanitizeRange: (range: any) => any;
declare const cleanRangeBackSlash: (slashes: any) => any;
declare const REPLACERS: (RegExp | ((match: any, leadEscape: any, range: any, endEscape: any, close: any) => string))[][];
declare const regexCache: any;
declare const makeRegex: (pattern: any, ignoreCase: any) => RegExp;
declare const isString: (subject: any) => boolean;
declare const checkPattern: (pattern: any) => boolean;
declare const splitPattern: (pattern: any) => any;
declare class IgnoreRule {
    constructor(origin: any, pattern: any, negative: any, regex: any);
}
declare const createRule: (pattern: any, ignoreCase: any) => IgnoreRule;
declare const throwError: (message: any, Ctor: any) => never;
declare const checkPath: {
    (path: any, originalPath: any, doThrow: any): any;
    isNotRelative: (path: any) => boolean;
    convert(p: any): any;
};
declare const isNotRelative: (path: any) => boolean;
declare class Ignore {
    constructor({ ignorecase, ignoreCase, allowRelativePaths }?: {
        ignorecase?: boolean;
        ignoreCase?: any;
        allowRelativePaths?: boolean;
    });
    _initCache(): void;
    _addPattern(pattern: any): void;
    add(pattern: any): this;
    addPattern(pattern: any): this;
    _testOne(path: any, checkUnignored: any): {
        ignored: boolean;
        unignored: boolean;
    };
    _test(originalPath: any, cache: any, checkUnignored: any, slices: any): any;
    _t(path: any, cache: any, checkUnignored: any, slices: any): any;
    ignores(path: any): any;
    createFilter(): (path: any) => boolean;
    filter(paths: any): any[];
    test(path: any): any;
}
declare const factory: {
    (options: any): Ignore;
    isPathValid: (path: any) => any;
    default: any;
};
declare const isPathValid: (path: any) => any;
