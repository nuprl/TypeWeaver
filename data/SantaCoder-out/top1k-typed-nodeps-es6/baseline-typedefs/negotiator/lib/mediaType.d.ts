declare var simpleMediaTypeRegExp: RegExp;
declare function parseAccept(accept: string): string[];
declare function parseMediaType(str: string, i: number): {
    type: string;
    subtype: string;
    params: any;
    q: number;
    i: number;
};
declare function getMediaTypePriority(type: string, accepted: string[], index: number): {
    o: number;
    q: number;
    s: number;
};
declare function preferredMediaTypes(accept: string, provided: string[]): unknown[];
declare function getFullType(spec: any): string;
declare function quoteCount(string: string): number;
declare function splitKeyValuePair(str: string): any[];
declare function splitMediaTypes(accept: string): string[];
declare function splitParameters(str: string): string[];
