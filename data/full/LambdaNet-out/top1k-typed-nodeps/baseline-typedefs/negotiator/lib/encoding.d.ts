declare var simpleEncodingRegExp: RegExp;
declare function parseAcceptEncoding(accept: string): any[];
declare function parseEncoding(str: string, i: number): object;
declare function getEncodingPriority(encoding: string, accepted: any[], index: number): object;
declare function preferredEncodings(accept: number, provided: any[]): any[];
declare function getFullEncoding(spec: object): string;
