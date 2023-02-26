declare const path: any;
declare const scan: any;
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
declare const utils: any;
declare const constants: any;
declare const isObject: (val: any) => boolean;
declare const picomatch: any;
