declare const inspect: any;
declare const i: (val: any) => any;
declare const origAnymatch: any;
declare const matchers: (string | RegExp | ((string: any) => boolean))[];
declare const anymatch: {
    (...args: any[]): void;
    default: any;
};
declare const matcher: any;
