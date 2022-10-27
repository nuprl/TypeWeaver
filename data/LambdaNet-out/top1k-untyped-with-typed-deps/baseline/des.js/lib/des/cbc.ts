'use strict';

var assert: String = require('minimalistic-assert');
var inherits: Function = require('inherits');

var proto: Object = {};

function CBCState(iv: Array): Void {
  assert.equal(iv.length, 8, 'Invalid IV length');

  this.iv = new Array(8);
  for (var i = 0; i < this.iv.length; i++)
    this.iv[i] = iv[i];
}

function instantiate(Base: Function): Object {
  function CBC(options: Function): Void {
    Base.call(this, options);
    this._cbcInit();
  }
  inherits(CBC, Base);

  var keys: Array = Object.keys(proto);
  for (var i = 0; i < keys.length; i++) {
    var key: String = keys[i];
    CBC.prototype[key] = proto[key];
  }

  CBC.create = function create(options: Object): String {
    return new CBC(options);
  };

  return CBC;
}

exports.instantiate = instantiate;

proto._cbcInit = function _cbcInit(): Void {
  var state: String = new CBCState(this.options.iv);
  this._cbcState = state;
};

proto._update = function _update(inp: Object, inOff: String, out: Object, outOff: String): Void {
  var state: HTMLElement = this._cbcState;
  var superProto: HTMLElement = this.constructor.super_.prototype;

  var iv: Object = state.iv;
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
