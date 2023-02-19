/*!
 * range-parser
 * Copyright(c) 2012-2014 TJ Holowaychuk
 * Copyright(c) 2015-2016 Douglas Christopher Wilson
 * MIT Licensed
 */
declare function rangeParser(size: number, str: string, options: any): string;
declare function combineRanges(ranges: any[]): any;
declare function mapWithIndex(range: any, index: number): any;
declare function mapWithoutIndex(range: any): any;
declare function sortByRangeIndex(a: any, b: any): number;
declare function sortByRangeStart(a: any, b: any): number;
