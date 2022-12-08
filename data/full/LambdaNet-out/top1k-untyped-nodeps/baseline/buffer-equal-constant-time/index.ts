/*jshint node:true */
'use strict';
var Buffer: HTMLElement = require('buffer').Buffer; // browserify
var SlowBuffer: HTMLElement = require('buffer').SlowBuffer;

module.exports = bufferEq;

function bufferEq(a: any[], b: any[]): boolean {

  // shortcutting on type is necessary for correctness
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    return false;
  }

  // buffer sizes should be well-known information, so despite this
  // shortcutting, it doesn't leak any information about the *contents* of the
  // buffers.
  if (a.length !== b.length) {
    return false;
  }

  var c: number = 0;
  for (var i = 0; i < a.length; i++) {
    /*jshint bitwise:false */
    c |= a[i] ^ b[i]; // XOR
  }
  return c === 0;
}

bufferEq.install = function() {
  Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that: Function): boolean {
    return bufferEq(this, that);
  };
};

var origBufEqual: number = Buffer.prototype.equal;
var origSlowBufEqual: boolean = SlowBuffer.prototype.equal;
bufferEq.restore = function() {
  Buffer.prototype.equal = origBufEqual;
  SlowBuffer.prototype.equal = origSlowBufEqual;
};
