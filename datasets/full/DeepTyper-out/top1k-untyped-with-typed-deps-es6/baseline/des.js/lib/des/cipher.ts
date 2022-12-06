'use strict';

import assert from 'minimalistic-assert';

function Cipher(options: any): void {
  this.options = options;

  this.type = this.options.type;
  this.blockSize = 8;
  this._init();

  this.buffer = new Array(this.blockSize);
  this.bufferOff = 0;
}
export default Cipher;

Cipher.prototype._init = function _init(): void {
  // Might be overrided
};

Cipher.prototype.update = function update(data: any): any {
  if (data.length === 0)
    return [];

  if (this.type === 'decrypt')
    return this._updateDecrypt(data);
  else
    return this._updateEncrypt(data);
};

Cipher.prototype._buffer = function _buffer(data: any, off: any): any {
  // Append data to buffer
  var min: number = Math.min(this.buffer.length - this.bufferOff, data.length - off);
  for (var i = 0; i < min; i++)
    this.buffer[this.bufferOff + i] = data[off + i];
  this.bufferOff += min;

  // Shift next
  return min;
};

Cipher.prototype._flushBuffer = function _flushBuffer(out: any, off: any): void {
  this._update(this.buffer, 0, out, off);
  this.bufferOff = 0;
  return this.blockSize;
};

Cipher.prototype._updateEncrypt = function _updateEncrypt(data: any): number {
  var inputOff: number = 0;
  var outputOff: number = 0;

  var count: number = ((this.bufferOff + data.length) / this.blockSize) | 0;
  var out: number[] = new Array(count * this.blockSize);

  if (this.bufferOff !== 0) {
    inputOff += this._buffer(data, inputOff);

    if (this.bufferOff === this.buffer.length)
      outputOff += this._flushBuffer(out, outputOff);
  }

  // Write blocks
  var max: number = data.length - ((data.length - inputOff) % this.blockSize);
  for (; inputOff < max; inputOff += this.blockSize) {
    this._update(data, inputOff, out, outputOff);
    outputOff += this.blockSize;
  }

  // Queue rest
  for (; inputOff < data.length; inputOff++, this.bufferOff++)
    this.buffer[this.bufferOff] = data[inputOff];

  return out;
};

Cipher.prototype._updateDecrypt = function _updateDecrypt(data: any): number {
  var inputOff: number = 0;
  var outputOff: number = 0;

  var count: number = Math.ceil((this.bufferOff + data.length) / this.blockSize) - 1;
  var out: number[] = new Array(count * this.blockSize);

  // TODO(indutny): optimize it, this is far from optimal
  for (; count > 0; count--) {
    inputOff += this._buffer(data, inputOff);
    outputOff += this._flushBuffer(out, outputOff);
  }

  // Buffer rest of the input
  inputOff += this._buffer(data, inputOff);

  return out;
};

Cipher.prototype.final = function final(buffer: Buffer): number {
  var first: any;
  if (buffer)
    first = this.update(buffer);

  var last: any;
  if (this.type === 'encrypt')
    last = this._finalEncrypt();
  else
    last = this._finalDecrypt();

  if (first)
    return first.concat(last);
  else
    return last;
};

Cipher.prototype._pad = function _pad(buffer: any, off: any): boolean {
  if (off === 0)
    return false;

  while (off < buffer.length)
    buffer[off++] = 0;

  return true;
};

Cipher.prototype._finalEncrypt = function _finalEncrypt(): void {
  if (!this._pad(this.buffer, this.bufferOff))
    return [];

  var out: any[] = new Array(this.blockSize);
  this._update(this.buffer, 0, out, 0);
  return out;
};

Cipher.prototype._unpad = function _unpad(buffer: any): number {
  return buffer;
};

Cipher.prototype._finalDecrypt = function _finalDecrypt(): void {
  assert.equal(this.bufferOff, this.blockSize, 'Not enough data to decrypt');
  var out: number[] = new Array(this.blockSize);
  this._flushBuffer(out, 0);

  return this._unpad(out);
};
