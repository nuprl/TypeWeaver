export function config(options: any): {
    parsed: {};
    error?: undefined;
} | {
    error: any;
    parsed?: undefined;
};
export function parse(src: any): {};
export default DotenvModule;
declare namespace DotenvModule {
    export { config };
    export { parse };
}
declare function config(options: any): {
    parsed: {};
    error?: undefined;
} | {
    error: any;
    parsed?: undefined;
};
declare function parse(src: any): {};
