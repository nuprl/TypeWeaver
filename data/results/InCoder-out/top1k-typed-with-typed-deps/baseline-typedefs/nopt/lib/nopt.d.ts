/// <reference types="node" />
declare var debug: () => void;
declare var url: any;
declare var path: any;
declare var Stream: any;
declare var abbrev: any;
declare var os: any;
declare function nopt(types: Array<string>, shorthands: Array<string>, args: Array<any>, slice: Array<number>): {};
declare function clean(data: any, types: any, typeDefs: any): void;
declare function validateString(data: any, k: any, val: any): void;
declare function validatePath(data: any, k: any, val: any): boolean;
declare function validateNumber(data: any, k: any, val: any): boolean;
declare function validateDate(data: Date, k: number, val: number): boolean;
declare function validateBoolean(data: any, k: any, val: any): void;
declare function validateUrl(data: any, k: any, val: any): boolean;
declare function validateStream(data: Buffer, k: number, val: number): boolean;
declare function validate(data: any, k: any, val: any, type: any, typeDefs: any): boolean;
declare function parse(args: string[], data: any, remain: number, types: any[], shorthands: any[]): void;
declare function resolveShort(arg: number, shorthands: number[], shortAbbr: number[], abbrevs: string[]): any;
