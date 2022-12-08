'use strict';

var assert: string = require('minimalistic-assert');
var inherits: Function = require('inherits');

var utils: HTMLElement = require('./utils');
var Cipher: Function = require('./cipher');

function DESState(): void {
  this.tmp = new Array(2);
  this.keys = null;
}

function DES(options: object): void {
  Cipher.call(this, options);

  var state: string = new DESState();
  this._desState = state;

  this.deriveKeys(state, options.key);
}
inherits(DES, Cipher);
module.exports = DES;

DES.create = function create(options: object): string {
  return new DES(options);
};

var shiftTable: any[] = [
  1, 1, 2, 2, 2, 2, 2, 2,
  1, 2, 2, 2, 2, 2, 2, 1
];

DES.prototype.deriveKeys = function deriveKeys(state: Map, key: string): void {
  state.keys = new Array(16 * 2);

  assert.equal(key.length, this.blockSize, 'Invalid key length');

  var kL: string = utils.readUInt32BE(key, 0);
  var kR: string = utils.readUInt32BE(key, 4);

  utils.pc1(kL, kR, state.tmp, 0);
  kL = state.tmp[0];
  kR = state.tmp[1];
  for (var i = 0; i < state.keys.length; i += 2) {
    var shift: string = shiftTable[i >>> 1];
    kL = utils.r28shl(kL, shift);
    kR = utils.r28shl(kR, shift);
    utils.pc2(kL, kR, state.keys, i);
  }
};

DES.prototype._update = function _update(inp: string, inOff: number, out: string, outOff: number): void {
  var state: HTMLElement = this._desState;

  var l: string = utils.readUInt32BE(inp, inOff);
  var r: string = utils.readUInt32BE(inp, inOff + 4);

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

DES.prototype._pad = function _pad(buffer: object, off: number): boolean {
  var value: number = buffer.length - off;
  for (var i = off; i < buffer.length; i++)
    buffer[i] = value;

  return true;
};

DES.prototype._unpad = function _unpad(buffer: object): boolean {
  var pad: number = buffer[buffer.length - 1];
  for (var i = buffer.length - pad; i < buffer.length; i++)
    assert.equal(buffer[i], pad);

  return buffer.slice(0, buffer.length - pad);
};

DES.prototype._encrypt = function _encrypt(state: HTMLElement, lStart: string, rStart: string, out: Function, off: string): void {
  var l: string = lStart;
  var r: string = rStart;

  // Apply f() x16 times
  for (var i = 0; i < state.keys.length; i += 2) {
    var keyL: string = state.keys[i];
    var keyR: string = state.keys[i + 1];

    // f(r, k)
    utils.expand(r, state.tmp, 0);

    keyL ^= state.tmp[0];
    keyR ^= state.tmp[1];
    var s: string = utils.substitute(keyL, keyR);
    var f: string = utils.permute(s);

    var t: string = r;
    r = (l ^ f) >>> 0;
    l = t;
  }

  // Reverse Initial Permutation
  utils.rip(r, l, out, off);
};

DES.prototype._decrypt = function _decrypt(state: HTMLElement, lStart: string, rStart: string, out: Function, off: string): void {
  var l: string = rStart;
  var r: string = lStart;

  // Apply f() x16 times
  for (var i = state.keys.length - 2; i >= 0; i -= 2) {
    var keyL: string = state.keys[i];
    var keyR: string = state.keys[i + 1];

    // f(r, k)
    utils.expand(l, state.tmp, 0);

    keyL ^= state.tmp[0];
    keyR ^= state.tmp[1];
    var s: string = utils.substitute(keyL, keyR);
    var f: string = utils.permute(s);

    var t: string = l;
    l = (r ^ f) >>> 0;
    r = t;
  }

  // Reverse Initial Permutation
  utils.rip(l, r, out, off);
};
