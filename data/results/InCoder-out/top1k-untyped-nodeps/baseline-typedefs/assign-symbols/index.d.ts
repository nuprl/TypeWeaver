/*!
 * assign-symbols <https://github.com/jonschlinkert/assign-symbols>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Licensed under the MIT License.
 */
declare const toString: () => string;
declare const isEnumerable: (v: PropertyKey) => boolean;
declare const getSymbols: (o: any) => symbol[];
declare function isObject(val: any): boolean;
