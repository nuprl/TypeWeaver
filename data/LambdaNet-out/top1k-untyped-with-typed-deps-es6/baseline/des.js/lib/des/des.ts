'use strict';

import assert from 'minimalistic-assert';
import inherits from 'inherits';
import utils from './utils';
import Cipher from './cipher';

function DESState(): Void {
  this.tmp = new Array(2);
  this.keys = null;
}

function DES(options: Object): Void {
  Cipher.call(this, options);

  var state: String = new DESState();
  this._desState = state;

  this.deriveKeys(state, options.key);
}
inherits(DES, Cipher);
export default DES;

DES.create = function create(options: Object): String {
  return new DES(options);
};

var shiftTable: Array = [
  1, 1, 2, 2, 2, 2, 2, 2,
  1, 2, 2, 2, 2, 2, 2, 1
];

DES.prototype.deriveKeys = function deriveKeys(state: Map, key: String): Void {
  state.keys = new Array(16 * 2);

  assert.equal(key.length, this.blockSize, 'Invalid key length');

  var kL: String = utils.readUInt32BE(key, 0);
  var kR: String = utils.readUInt32BE(key, 4);

  utils.pc1(kL, kR, state.tmp, 0);
  kL = state.tmp[0];
  kR = state.tmp[1];
  for (var i = 0; i < state.keys.length; i += 2) {
    var shift: String = shiftTable[i >>> 1];
    kL = utils.r28shl(kL, shift);
    kR = utils.r28shl(kR, shift);
    utils.pc2(kL, kR, state.keys, i);
  }
};

DES.prototype._update = function _update(inp: String, inOff: Number, out: String, outOff: Number): Void {
  var state: HTMLElement = this._desState;

  var l: String = utils.readUInt32BE(inp, inOff);
  var r: String = utils.readUInt32BE(inp, inOff + 4);

  // Initial Permutation
  utils.ip(l, r, state.tmp, 0);
  l = state.tmp[0];
  r = state.tmp[1];

  if (this.type === 'encrypt')
    this._encrypt(state, l, r, state.tmp, 0);
  else
    this._decrypt(state, l, r, state.tmp, 0);

  l = state.tmp[0];
  r = state.tmp[1];

  utils.writeUInt32BE(out, l, outOff);
  utils.writeUInt32BE(out, r, outOff + 4);
};

DES.prototype._pad = function _pad(buffer: Object, off: Number): Boolean {
  var value: Number = buffer.length - off;
  for (var i = off; i < buffer.length; i++)
    buffer[i] = value;

  return true;
};

DES.prototype._unpad = function _unpad(buffer: Object): Boolean {
  var pad: Number = buffer[buffer.length - 1];
  for (var i = buffer.length - pad; i < buffer.length; i++)
    assert.equal(buffer[i], pad);

  return buffer.slice(0, buffer.length - pad);
};

DES.prototype._encrypt = function _encrypt(state: HTMLElement, lStart: String, rStart: String, out: Function, off: String): Void {
  var l: String = lStart;
  var r: String = rStart;

  // Apply f() x16 times
  for (var i = 0; i < state.keys.length; i += 2) {
    var keyL: String = state.keys[i];
    var keyR: String = state.keys[i + 1];

    // f(r, k)
    utils.expand(r, state.tmp, 0);

    keyL ^= state.tmp[0];
    keyR ^= state.tmp[1];
    var s: String = utils.substitute(keyL, keyR);
    var f: String = utils.permute(s);

    var t: String = r;
    r = (l ^ f) >>> 0;
    l = t;
  }

  // Reverse Initial Permutation
  utils.rip(r, l, out, off);
};

DES.prototype._decrypt = function _decrypt(state: HTMLElement, lStart: String, rStart: String, out: Function, off: String): Void {
  var l: String = rStart;
  var r: String = lStart;

  // Apply f() x16 times
  for (var i = state.keys.length - 2; i >= 0; i -= 2) {
    var keyL: String = state.keys[i];
    var keyR: String = state.keys[i + 1];

    // f(r, k)
    utils.expand(l, state.tmp, 0);

    keyL ^= state.tmp[0];
    keyR ^= state.tmp[1];
    var s: String = utils.substitute(keyL, keyR);
    var f: String = utils.permute(s);

    var t: String = l;
    l = (r ^ f) >>> 0;
    r = t;
  }

  // Reverse Initial Permutation
  utils.rip(l, r, out, off);
};
