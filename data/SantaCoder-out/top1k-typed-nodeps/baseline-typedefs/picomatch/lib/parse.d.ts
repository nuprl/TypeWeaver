declare const constants: any;
declare const utils: any;
declare const MAX_LENGTH: any, POSIX_REGEX_SOURCE: any, REGEX_NON_SPECIAL_CHARS: any, REGEX_SPECIAL_CHARS_BACKREF: any, REPLACEMENTS: any;
declare const expandRange: (args: any, options: any) => any;
declare const syntaxError: (type: any, char: any) => string;
declare const parse: {
    (input: any, options: any): {
        input: any;
        index: number;
        start: number;
        dot: boolean;
        consumed: string;
        output: string;
        prefix: string;
        backtrack: boolean;
        negated: boolean;
        brackets: number;
        braces: number;
        parens: number;
        quotes: number;
        globstar: boolean;
        tokens: {
            type: string;
            value: string;
            output: any;
        }[];
    };
    fastpaths(input: any, options: any): any;
};
