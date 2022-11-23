declare const conversions: any;
declare const route: any;
declare const convert: {};
declare const models: string[];
declare function wrapRaw(fn: Function): {
    (...args: any[]): any;
    conversion: any;
};
declare function wrapRounded(fn: Function): {
    (...args: any[]): any;
    conversion: any;
};
