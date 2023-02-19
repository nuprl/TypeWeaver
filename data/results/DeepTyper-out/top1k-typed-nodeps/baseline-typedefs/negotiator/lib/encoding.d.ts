declare var simpleEncodingRegExp: RegExp;
declare function parseAcceptEncoding(accept: string): string;
declare function parseEncoding(str: string, i: number): string;
declare function getEncodingPriority(encoding: string, accepted: any, index: number): any;
declare function preferredEncodings(accept: string, provided: boolean): boolean;
declare function getFullEncoding(spec: any): string;
