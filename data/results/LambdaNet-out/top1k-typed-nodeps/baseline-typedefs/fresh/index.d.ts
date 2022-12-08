/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var CACHE_CONTROL_NO_CACHE_REGEXP: RegExp;
declare function fresh(reqHeaders: object, resHeaders: Promise): boolean;
declare function parseHttpDate(date: number): number;
declare function parseTokenList(str: string): any[];
