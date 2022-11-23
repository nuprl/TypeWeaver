declare const inspect: any;
declare const i: (val: any) => any;
declare const origAnymatch: any;
declare const matchers: (string | RegExp | ((string: any) => boolean))[];
declare const anymatch: {
    (matchers: any, testString: any, options?: {
        returnIndex: boolean;
    }): number | boolean | ((testString: any, ri?: boolean) => number | boolean);
    default: any;
};
declare const matcher: any;
