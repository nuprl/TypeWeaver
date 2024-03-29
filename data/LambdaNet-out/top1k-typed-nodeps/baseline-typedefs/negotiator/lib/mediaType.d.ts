declare var simpleMediaTypeRegExp: RegExp;
declare function parseAccept(accept: string): any[];
declare function parseMediaType(str: string, i: number): object;
declare function getMediaTypePriority(type: string, accepted: any[], index: number): object;
declare function preferredMediaTypes(accept: number, provided: any[]): any[];
declare function getFullType(spec: object): string;
declare function quoteCount(string: string): number;
declare function splitKeyValuePair(str: string): Promise;
declare function splitMediaTypes(accept: string): object;
declare function splitParameters(str: string): object;
