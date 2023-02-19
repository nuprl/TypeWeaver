'use strict';

var assert: any = require('minimalistic-assert');
var inherits: any = require('inherits');

var proto: any = {};

function CBCState(iv: any): void {
  assert.equal(iv.length, 8, 'Invalid IV length');

  this.iv = new Array(8);
  for (var i = 0; i < this.iv.length; i++)
    this.iv[i] = iv[i];
}

function instantiate(Base: any): any {
  function CBC(options: any): void {
    Base.call(this, options);
    this._cbcInit();
  }
  inherits(CBC, Base);

  var keys: string[] = Object.keys(proto);
  for (var i = 0; i < keys.length; i++) {
    var key: string = keys[i];
    CBC.prototype[key] = proto[key];
  }

  CBC.create = function create(options: any): any {
    return new CBC(options);
  };

  return CBC;
}

exports.instantiate = instantiate;

proto._cbcInit = function _cbcInit(): void {
  var state: any = new CBCState(this.options.iv);
  this._cbcState = state;
};

proto._update = function _update(inp: any, inOff: any, out: any, outOff: any): void {
  var state: any = this._cbcState;
  var superProto: any = this.constructor.super_.prototype;

  var iv: any = state.iv;
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
