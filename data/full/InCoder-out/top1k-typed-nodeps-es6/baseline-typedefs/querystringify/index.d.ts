declare function querystring(query: string | string[]): {};
declare function querystringify(obj: any, prefix: string | null): string;
export declare const stringify: typeof querystringify;
export declare const parse: typeof querystring;
export {};
