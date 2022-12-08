declare var has: (v: PropertyKey) => boolean, undef: any;
declare function decode(input: Uint8Array): string;
declare function encode(input: Uint8Array): string;
declare function querystring(query: string | string[]): {};
declare function querystringify(obj: any, prefix: string | null): string;
