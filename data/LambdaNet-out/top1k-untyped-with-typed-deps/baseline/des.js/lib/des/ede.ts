'use strict';

var assert: String = require('minimalistic-assert');
var inherits: Function = require('inherits');

var Cipher: Function = require('./cipher');
var DES: HTMLElement = require('./des');

function EDEState(type: String, key: String): Void {
  assert.equal(key.length, 24, 'Invalid key length');

  var k1: String = key.slice(0, 8);
  var k2: String = key.slice(8, 16);
  var k3: String = key.slice(16, 24);

  if (type === 'encrypt') {
    this.ciphers = [
      DES.create({ type: 'encrypt', key: k1 }),
      DES.create({ type: 'decrypt', key: k2 }),
      DES.create({ type: 'encrypt', key: k3 })
    ];
  } else {
    this.ciphers = [
      DES.create({ type: 'decrypt', key: k3 }),
      DES.create({ type: 'encrypt', key: k2 }),
      DES.create({ type: 'decrypt', key: k1 })
    ];
  }
}

function EDE(options: Function): Void {
  Cipher.call(this, options);

  var state: String = new EDEState(this.type, this.options.key);
  this._edeState = state;
}
inherits(EDE, Cipher);

module.exports = EDE;

EDE.create = function create(options: Object): String {
  return new EDE(options);
};

EDE.prototype._update = function _update(inp: String, inOff: String, out: Function, outOff: Function): Void {
  var state: HTMLElement = this._edeState;

  state.ciphers[0]._update(inp, inOff, out, outOff);
  state.ciphers[1]._update(out, outOff, out, outOff);
  state.ciphers[2]._update(out, outOff, out, outOff);
};

EDE.prototype._pad = DES.prototype._pad;
EDE.prototype._unpad = DES.prototype._unpad;