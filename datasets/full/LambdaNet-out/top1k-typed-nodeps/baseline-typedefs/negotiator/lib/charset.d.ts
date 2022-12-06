declare var simpleCharsetRegExp: RegExp;
declare function parseAcceptCharset(accept: string): any[];
declare function parseCharset(str: string, i: number): object;
declare function getCharsetPriority(charset: string, accepted: any[], index: number): object;
declare function preferredCharsets(accept: number, provided: any[]): any[];
declare function getFullCharset(spec: object): any[];
