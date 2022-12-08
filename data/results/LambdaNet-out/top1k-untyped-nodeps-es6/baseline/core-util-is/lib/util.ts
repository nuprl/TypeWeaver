// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg: string): boolean {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg: string): boolean {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg: number): boolean {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg: number): boolean {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg: string): boolean {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg: string): boolean {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg: string): boolean {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg: number): boolean {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re: string): boolean {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg: string): boolean {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d: string): boolean {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e: string): boolean {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg: string): boolean {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg: string): boolean {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = require('buffer').Buffer.isBuffer;

function objectToString(o: string): boolean {
  return Object.prototype.toString.call(o);
}
