declare const fs: any;
declare const path: any;
declare const os: any;
declare const LINE: RegExp;
declare function parse(src: any): {};
declare function _log(message: any): void;
declare function _resolveHome(envPath: string | null): any;
declare function config(options: any): {
    parsed: {};
    error?: undefined;
} | {
    error: any;
    parsed?: undefined;
};
declare const DotenvModule: {
    config: typeof config;
    parse: typeof parse;
};
