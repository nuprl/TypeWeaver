/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
declare const isNumber: Function;
declare const toRegexRange: Function;
declare function collatePatterns(neg: string, pos: string, options: object): string;
declare function splitToRanges(min: number, max: number): Map;
declare function rangeToPattern(start: number, stop: string, options: object): object;
declare function splitToPatterns(min: string, max: string, tok: string, options: object): any[];
declare function filterPatterns(arr: any[], comparison: string, prefix: string, intersection: number, options: object): any[];
declare function zip(a: any[], b: object): any[];
declare function compare(a: number, b: number): number;
declare function contains(arr: any[], key: string, val: number): boolean;
declare function countNines(min: string, len: number): number;
declare function countZeros(integer: number, zeros: number): number;
declare function toQuantifier(digits: any[]): string;
declare function toCharacterClass(a: number, b: number, options: object): string;
declare function hasPadding(str: string): boolean;
declare function padZeros(value: string, tok: HTMLElement, options: Element): string;
