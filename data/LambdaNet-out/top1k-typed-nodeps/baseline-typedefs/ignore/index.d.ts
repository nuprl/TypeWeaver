declare function makeArray(subject: any[]): any[];
declare const EMPTY: string;
declare const SPACE: string;
declare const ESCAPE: string;
declare const REGEX_TEST_BLANK_LINE: RegExp;
declare const REGEX_REPLACE_LEADING_EXCAPED_EXCLAMATION: RegExp;
declare const REGEX_REPLACE_LEADING_EXCAPED_HASH: RegExp;
declare const REGEX_SPLITALL_CRLF: RegExp;
declare const REGEX_TEST_INVALID_PATH: RegExp;
declare const SLASH: string;
declare const KEY_IGNORE: string;
declare const define: Function;
declare const REGEX_REGEXP_RANGE: RegExp;
declare const RETURN_FALSE: Function;
declare const sanitizeRange: Function;
declare const cleanRangeBackSlash: Function;
declare const REPLACERS: any[];
declare const regexCache: object;
declare const makeRegex: Function;
declare const isString: Function;
declare const checkPattern: Function;
declare const splitPattern: Function;
declare class IgnoreRule {
    constructor(origin: any, pattern: any, negative: any, regex: any);
}
declare const createRule: Function;
declare const throwError: Function;
declare const checkPath: Function;
declare const isNotRelative: Function;
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
    createFilter(): (path: string) => boolean;
    filter(paths: any): any[];
    test(path: any): any;
}
declare const factory: Function;
declare const isPathValid: Function;
