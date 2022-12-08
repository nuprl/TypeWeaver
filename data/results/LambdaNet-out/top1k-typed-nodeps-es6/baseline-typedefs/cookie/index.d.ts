/*!
 * cookie
 * Copyright(c) 2012-2014 Roman Shtylman
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var __toString: Function;
declare var fieldContentRegExp: RegExp;
declare function parse(str: string, options: object): object;
declare function serialize(name: string, val: string, options: object): string;
declare function decode(str: string): string;
declare function encode(val: string): string;
declare function isDate(val: string): boolean;
declare function tryDecode(str: string, decode: Function): void;
