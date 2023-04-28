/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var CACHE_CONTROL_NO_CACHE_REGEXP: RegExp;
declare function fresh(reqHeaders: Headers, resHeaders: Headers): boolean;
declare function parseHttpDate(date: string): number;
declare function parseTokenList(str: string): any[];
