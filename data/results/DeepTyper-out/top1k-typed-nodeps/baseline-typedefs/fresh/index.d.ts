/*!
 * fresh
 * Copyright(c) 2012 TJ Holowaychuk
 * Copyright(c) 2016-2017 Douglas Christopher Wilson
 * MIT Licensed
 */
declare var CACHE_CONTROL_NO_CACHE_REGEXP: string;
declare function fresh(reqHeaders: string, resHeaders: any): boolean;
declare function parseHttpDate(date: Date): boolean;
declare function parseTokenList(str: any): any;
