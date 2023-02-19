/*!
 * fill-range <https://github.com/jonschlinkert/fill-range>
 *
 * Copyright (c) 2014-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
declare const util: any;
declare const toRegexRange: any;
declare const isObject: (val: any) => boolean;
declare const transform: (toNumber: any) => (value: any) => string | number;
declare const isValidValue: (value: any) => boolean;
declare const isNumber: (num: any) => boolean;
declare const zeros: (input: any) => boolean;
declare const stringify: (start: any, end: any, options: any) => boolean;
declare const pad: (input: any, maxLength: any, toNumber: any) => any;
declare const toMaxLen: (input: any, maxLength: any) => any;
declare const toSequence: (parts: any, options: any) => any;
declare const toRange: (a: any, b: any, isNumbers: any, options: any) => any;
declare const toRegex: (start: any, end: any, options: any) => any;
declare const rangeError: (...args: any[]) => RangeError;
declare const invalidRange: (start: any, end: any, options: any) => any[];
declare const invalidStep: (step: any, options: any) => any[];
declare const fillNumbers: (start: any, end: any, step?: number, options?: {}) => any;
declare const fillLetters: (start: any, end: any, step?: number, options?: {}) => any;
declare const fill: (start: any, end: any, step: any, options?: {}) => any;
