/*!
 * shallow-clone <https://github.com/jonschlinkert/shallow-clone>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const valueOf: number = Symbol.prototype.valueOf;
import typeOf from 'kind-of';

function clone(val: any, deep: boolean): any {
  switch (typeOf(val)) {
    case 'array':
      return val.slice();
    case 'object':
      return Object.assign({}, val);
    case 'date':
      return new val.constructor(Number(val));
    case 'map':
      return new Map(val);
    case 'set':
      return new Set(val);
    case 'buffer':
      return cloneBuffer(val);
    case 'symbol':
      return cloneSymbol(val);
    case 'arraybuffer':
      return cloneArrayBuffer(val);
    case 'float32array':
    case 'float64array':
    case 'int16array':
    case 'int32array':
    case 'int8array':
    case 'uint16array':
    case 'uint32array':
    case 'uint8clampedarray':
    case 'uint8array':
      return cloneTypedArray(val);
    case 'regexp':
      return cloneRegExp(val);
    case 'error':
      return Object.create(val);
    default: {
      return val;
    }
  }
}

function cloneRegExp(val: any): any {
  const flags: number = val.flags !== void 0 ? val.flags : (/\w+$/.exec(val) || void 0);
  const re: any = new val.constructor(val.source, flags);
  re.lastIndex = val.lastIndex;
  return re;
}

function cloneArrayBuffer(val: any): any {
  const res: any = new val.constructor(val.byteLength);
  new Uint8Array(res).set(new Uint8Array(val));
  return res;
}

function cloneTypedArray(val: any, deep: boolean): any {
  return new val.constructor(val.buffer, val.byteOffset, val.length);
}

function cloneBuffer(val: any): any {
  const len: number = val.length;
  const buf: any = Buffer.allocUnsafe ? Buffer.allocUnsafe(len) : Buffer.from(len);
  val.copy(buf);
  return buf;
}

function cloneSymbol(val: any): any {
  return valueOf ? Object(valueOf.call(val)) : {};
}

/**
 * Expose `clone`
 */

export default clone;
