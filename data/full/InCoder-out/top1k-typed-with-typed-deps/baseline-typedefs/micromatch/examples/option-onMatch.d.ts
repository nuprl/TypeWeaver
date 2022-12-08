declare const micromatch: {
    (list: any, patterns: any, options: any): any;
    match: any;
    matcher(pattern: any, options: any): any;
    isMatch(str: any, patterns: any, options: any): any;
    any: (str: any, patterns: any, options: any) => any;
    not(list: any, patterns: any, options?: {}): unknown[];
    contains(str: any, pattern: any, options: any): any;
    matchKeys(obj: any, patterns: any, options: any): {};
    some(list: any, patterns: any, options: any): boolean;
    every(list: any, patterns: any, options: any): boolean;
    all(str: any, patterns: any, options: any): boolean;
    capture(glob: any, input: any, options: any): any;
    makeRe(...args: any[]): any;
    scan(...args: any[]): any;
    parse(patterns: any, options: any): any[];
    braces(pattern: any, options: any): any;
    braceExpand(pattern: any, options: any): any;
};
declare const onMatch: ({ glob, regex, input, output }: {
    glob: any;
    regex: any;
    input: any;
    output: any;
}) => void;
declare const isMatch: any;
