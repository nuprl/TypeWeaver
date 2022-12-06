import picomatch from 'picomatch';
declare const micromatch: {
    (list: any, patterns: any, options: any): any;
    match: any;
    matcher(pattern: any, options: any): picomatch.Matcher;
    isMatch(str: any, patterns: any, options: any): boolean;
    any: (str: any, patterns: any, options: any) => boolean;
    not(list: any, patterns: any, options?: {}): unknown[];
    contains(str: any, pattern: any, options: any): any;
    matchKeys(obj: any, patterns: any, options: any): {};
    some(list: any, patterns: any, options: any): boolean;
    every(list: any, patterns: any, options: any): boolean;
    all(str: any, patterns: any, options: any): boolean;
    capture(glob: any, input: any, options: any): string[];
    makeRe(...args: any[]): RegExp;
    scan(...args: any[]): import("picomatch/lib/scan").State;
    parse(patterns: any, options: any): any[];
    braces(pattern: any, options: any): string[];
    braceExpand(pattern: any, options: any): string[];
};
export default micromatch;
