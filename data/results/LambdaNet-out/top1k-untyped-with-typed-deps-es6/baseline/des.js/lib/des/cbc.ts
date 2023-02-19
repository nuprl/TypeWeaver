'use strict';

import assert from 'minimalistic-assert';
import inherits from 'inherits';

var proto: object = {};

function CBCState(iv: any[]): void {
  assert.equal(iv.length, 8, 'Invalid IV length');

  this.iv = new Array(8);
  for (var i = 0; i < this.iv.length; i++)
    this.iv[i] = iv[i];
}

function instantiate(Base: Function): object {
  function CBC(options: Function): void {
    Base.call(this, options);
    this._cbcInit();
  }
  inherits(CBC, Base);

  var keys: any[] = Object.keys(proto);
  for (var i = 0; i < keys.length; i++) {
    var key: string = keys[i];
    CBC.prototype[key] = proto[key];
  }

  CBC.create = function create(options: object): string {
    return new CBC(options);
  };

  return CBC;
}

exports.instantiate = instantiate;

proto._cbcInit = function _cbcInit(): void {
  var state: string = new CBCState(this.options.iv);
  this._cbcState = state;
};

proto._update = function _update(inp: object, inOff: string, out: object, outOff: string): void {
  var state: HTMLElement = this._cbcState;
  var superProto: Element = this.constructor.super_.prototype;

  var iv: object = state.iv;
  if (this.type === 'encrypt') {
    for (var i = 0; i < this.blockSize; i++)
      iv[i] ^= inp[inOff + i];

    superProto._update.call(this, iv, 0, out, outOff);

    for (var i = 0; i < this.blockSize; i++)
      iv[i] = out[outOff + i];
  } else {
    superProto._update.call(this, inp, inOff, out, outOff);

    for (var i = 0; i < this.blockSize; i++)
      out[outOff + i] ^= iv[i];

    for (var i = 0; i < this.blockSize; i++)
      iv[i] = inp[inOff + i];
  }
};
