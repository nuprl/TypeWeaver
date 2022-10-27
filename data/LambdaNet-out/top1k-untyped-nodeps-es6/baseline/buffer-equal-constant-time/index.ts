/*jshint node:true */
'use strict';
import { Buffer } from 'buffer'; // browserify
import { SlowBuffer } from 'buffer';

export default bufferEq;

function bufferEq(a: Array, b: Array): Boolean {

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

  var c: Number = 0;
  for (var i = 0; i < a.length; i++) {
    /*jshint bitwise:false */
    c |= a[i] ^ b[i]; // XOR
  }
  return c === 0;
}

bufferEq.install = function() {
  Buffer.prototype.equal = SlowBuffer.prototype.equal = function equal(that: Function): Promise {
    return bufferEq(this, that);
  };
};

var origBufEqual: Number = Buffer.prototype.equal;
var origSlowBufEqual: Boolean = SlowBuffer.prototype.equal;
bufferEq.restore = function() {
  Buffer.prototype.equal = origBufEqual;
  SlowBuffer.prototype.equal = origSlowBufEqual;
};
