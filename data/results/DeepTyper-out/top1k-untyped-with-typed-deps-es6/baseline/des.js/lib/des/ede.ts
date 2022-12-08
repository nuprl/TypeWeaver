'use strict';

import assert from 'minimalistic-assert';
import inherits from 'inherits';
import Cipher from './cipher';
import DES from './des';

function EDEState(type, key: string): void {
  assert.equal(key.length, 24, 'Invalid key length');

  var k1: any = key.slice(0, 8);
  var k2: any = key.slice(8, 16);
  var k3: any = key.slice(16, 24);

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

function EDE(options: any): void {
  Cipher.call(this, options);

  var state: any = new EDEState(this.type, this.options.key);
  this._edeState = state;
}
inherits(EDE, Cipher);

export default EDE;

EDE.create = function create(options: any): any {
  return new EDE(options);
};

EDE.prototype._update = function _update(inp: any, inOff: any, out: any, outOff: any): void {
  var state: any = this._edeState;

  state.ciphers[0]._update(inp, inOff, out, outOff);
  state.ciphers[1]._update(out, outOff, out, outOff);
  state.ciphers[2]._update(out, outOff, out, outOff);
};

EDE.prototype._pad = DES.prototype._pad;
EDE.prototype._unpad = DES.prototype._unpad;
