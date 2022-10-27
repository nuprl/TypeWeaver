'use strict';

var assert: String = require('minimalistic-assert');

function Cipher(options: String): Void {
  this.options = options;

  this.type = this.options.type;
  this.blockSize = 8;
  this._init();

  this.buffer = new Array(this.blockSize);
  this.bufferOff = 0;
}
module.exports = Cipher;

Cipher.prototype._init = function _init(): Void {
  // Might be overrided
};

Cipher.prototype.update = function update(data: Array): Array {
  if (data.length === 0)
    return [];

  if (this.type === 'decrypt')
    return this._updateDecrypt(data);
  else
    return this._updateEncrypt(data);
};

Cipher.prototype._buffer = function _buffer(data: Array, off: Number): Number {
  // Append data to buffer
  var min: Number = Math.min(this.buffer.length - this.bufferOff, data.length - off);
  for (var i = 0; i < min; i++)
    this.buffer[this.bufferOff + i] = data[off + i];
  this.bufferOff += min;

  // Shift next
  return min;
};

Cipher.prototype._flushBuffer = function _flushBuffer(out: Function, off: Number): Object {
  this._update(this.buffer, 0, out, off);
  this.bufferOff = 0;
  return this.blockSize;
};

Cipher.prototype._updateEncrypt = function _updateEncrypt(data: Array): Array {
  var inputOff: Number = 0;
  var outputOff: Number = 0;

  var count: Number = ((this.bufferOff + data.length) / this.blockSize) | 0;
  var out: Array = new Array(count * this.blockSize);

  if (this.bufferOff !== 0) {
    inputOff += this._buffer(data, inputOff);

    if (this.bufferOff === this.buffer.length)
      outputOff += this._flushBuffer(out, outputOff);
  }

  // Write blocks
  var max: Number = data.length - ((data.length - inputOff) % this.blockSize);
  for (; inputOff < max; inputOff += this.blockSize) {
    this._update(data, inputOff, out, outputOff);
    outputOff += this.blockSize;
  }

  // Queue rest
  for (; inputOff < data.length; inputOff++, this.bufferOff++)
    this.buffer[this.bufferOff] = data[inputOff];

  return out;
};

Cipher.prototype._updateDecrypt = function _updateDecrypt(data: Array): Array {
  var inputOff: Number = 0;
  var outputOff: Number = 0;

  var count: Number = Math.ceil((this.bufferOff + data.length) / this.blockSize) - 1;
  var out: Array = new Array(count * this.blockSize);

  // TODO(indutny): optimize it, this is far from optimal
  for (; count > 0; count--) {
    inputOff += this._buffer(data, inputOff);
    outputOff += this._flushBuffer(out, outputOff);
  }

  // Buffer rest of the input
  inputOff += this._buffer(data, inputOff);

  return out;
};

Cipher.prototype.final = function final(buffer: Object): Function {
  var first: Map;
  if (buffer)
    first = this.update(buffer);

  var last: Array;
  if (this.type === 'encrypt')
    last = this._finalEncrypt();
  else
    last = this._finalDecrypt();

  if (first)
    return first.concat(last);
  else
    return last;
};

Cipher.prototype._pad = function _pad(buffer: Object, off: Number): Boolean {
  if (off === 0)
    return false;

  while (off < buffer.length)
    buffer[off++] = 0;

  return true;
};

Cipher.prototype._finalEncrypt = function _finalEncrypt(): Array {
  if (!this._pad(this.buffer, this.bufferOff))
    return [];

  var out: Array = new Array(this.blockSize);
  this._update(this.buffer, 0, out, 0);
  return out;
};

Cipher.prototype._unpad = function _unpad(buffer: Object): Object {
  return buffer;
};

Cipher.prototype._finalDecrypt = function _finalDecrypt(): Object {
  assert.equal(this.bufferOff, this.blockSize, 'Not enough data to decrypt');
  var out: Array = new Array(this.blockSize);
  this._flushBuffer(out, 0);

  return this._unpad(out);
};
