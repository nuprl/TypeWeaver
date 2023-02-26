declare var has: (v: PropertyKey) => boolean, undef: any;
declare function decode(input: Uint8Array): string;
declare function encode(input: any): string;
declare function querystring(query: string): {};
declare function querystringify(obj: any, prefix: string): string;
