/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var __toString: string;
declare var fieldContentRegExp: string;
declare function parse(str: string, options: any): any;
declare function serialize(name: string, val: any, options: any): string;
declare function decode(str: string): string;
declare function encode(val: string): string;
declare function isDate(val: any): boolean;
declare function tryDecode(str: string, decode: string): string;
