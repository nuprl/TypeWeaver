/*!
 * range-parser
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare function rangeParser(size: number, str: string, options: object): number;
declare function combineRanges(ranges: any[]): any[];
declare function mapWithIndex(range: object, index: number): object;
declare function mapWithoutIndex(range: object): object;
declare function sortByRangeIndex(a: object, b: object): number;
declare function sortByRangeStart(a: object, b: object): number;
