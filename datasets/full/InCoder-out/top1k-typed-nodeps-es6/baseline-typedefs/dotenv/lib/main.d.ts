declare function parse(src: any): {};
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
export declare const config: typeof config;
export declare const parse: typeof parse;
export default DotenvModule;
