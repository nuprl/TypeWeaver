/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */
/// <reference types="node" />
declare const valueOf: () => symbol;
declare const typeOf: any;
declare function clone(val: any, deep: boolean): any;
declare function cloneRegExp(val: RegExp): any;
declare function cloneArrayBuffer(val: ArrayBuffer): any;
declare function cloneTypedArray(val: any, deep: boolean): any;
declare function cloneBuffer(val: Buffer): Buffer;
declare function cloneSymbol(val: any): any;
