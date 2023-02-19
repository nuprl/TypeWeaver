declare var simpleCharsetRegExp: RegExp;
declare function parseAcceptCharset(accept: string): string;
declare function parseCharset(str: string, i: number): string;
declare function getCharsetPriority(charset: string, accepted: any, index: number): any;
declare function preferredCharsets(accept: string, provided: string): boolean;
declare function getFullCharset(spec: any): string;
