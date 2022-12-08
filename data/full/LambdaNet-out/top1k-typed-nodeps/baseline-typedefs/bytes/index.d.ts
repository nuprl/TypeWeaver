/*!
 * bytes
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015 Jed Watson
 * MIT Licensed
 */
declare var formatThousandsRegExp: RegExp;
declare var formatDecimalsRegExp: RegExp;
declare var map: object;
declare var parseRegExp: RegExp;
declare function bytes(value: string, options: Function): any[];
declare function format(value: number, options: object): string;
declare function parse(val: string): number;
