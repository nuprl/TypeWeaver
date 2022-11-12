'use strict';

import assert from 'minimalistic-assert';
import inherits from 'inherits';

exports.inherits = inherits;

function isSurrogatePair(msg: String, i: Number): Boolean {
  if ((msg.charCodeAt(i) & 0xFC00) !== 0xD800) {
    return false;
  }
  if (i < 0 || i + 1 >= msg.length) {
    return false;
  }
  return (msg.charCodeAt(i + 1) & 0xFC00) === 0xDC00;
}

function toArray(msg: String, enc: Boolean): Array {
  if (Array.isArray(msg))
    return msg.slice();
  if (!msg)
    return [];
  var res: Array = [];
  if (typeof msg === 'string') {
    if (!enc) {
      // Inspired by stringToUtf8ByteArray() in closure-library by Google
      // https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js#L117-L143
      // Apache License 2.0
      // https://github.com/google/closure-library/blob/master/LICENSE
      var p: Number = 0;
      for (var i = 0; i < msg.length; i++) {
        var c: Number = msg.charCodeAt(i);
        if (c < 128) {
          res[p++] = c;
        } else if (c < 2048) {
          res[p++] = (c >> 6) | 192;
          res[p++] = (c & 63) | 128;
        } else if (isSurrogatePair(msg, i)) {
          c = 0x10000 + ((c & 0x03FF) << 10) + (msg.charCodeAt(++i) & 0x03FF);
          res[p++] = (c >> 18) | 240;
          res[p++] = ((c >> 12) & 63) | 128;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        } else {
          res[p++] = (c >> 12) | 224;
          res[p++] = ((c >> 6) & 63) | 128;
          res[p++] = (c & 63) | 128;
        }
      }
    } else if (enc === 'hex') {
      msg = msg.replace(/[^a-z0-9]+/ig, '');
      if (msg.length % 2 !== 0)
        msg = '0' + msg;
      for (i = 0; i < msg.length; i += 2)
        res.push(parseInt(msg[i] + msg[i + 1], 16));
    }
  } else {
    for (i = 0; i < msg.length; i++)
      res[i] = msg[i] | 0;
  }
  return res;
}
exports.toArray = toArray;

function toHex(msg: Array): String {
  var res: String = '';
  for (var i = 0; i < msg.length; i++)
    res += zero2(msg[i].toString(16));
  return res;
}
exports.toHex = toHex;

function htonl(w: Number): Number {
  var res: Number = (w >>> 24) |
            ((w >>> 8) & 0xff00) |
            ((w << 8) & 0xff0000) |
            ((w & 0xff) << 24);
  return res >>> 0;
}
exports.htonl = htonl;

function toHex32(msg: Array, endian: Number): String {
  var res: String = '';
  for (var i = 0; i < msg.length; i++) {
    var w: String = msg[i];
    if (endian === 'little')
      w = htonl(w);
    res += zero8(w.toString(16));
  }
  return res;
}
exports.toHex32 = toHex32;

function zero2(word: String): String {
  if (word.length === 1)
    return '0' + word;
  else
    return word;
}
exports.zero2 = zero2;

function zero8(word: String): String {
  if (word.length === 7)
    return '0' + word;
  else if (word.length === 6)
    return '00' + word;
  else if (word.length === 5)
    return '000' + word;
  else if (word.length === 4)
    return '0000' + word;
  else if (word.length === 3)
    return '00000' + word;
  else if (word.length === 2)
    return '000000' + word;
  else if (word.length === 1)
    return '0000000' + word;
  else
    return word;
}
exports.zero8 = zero8;

function join32(msg: Object, start: Number, end: Number, endian: Number): Array {
  var len: Number = end - start;
  assert(len % 4 === 0);
  var res: Array = new Array(len / 4);
  for (var i = 0, k = start; i < res.length; i++, k += 4) {
    var w: Number;
    if (endian === 'big')
      w = (msg[k] << 24) | (msg[k + 1] << 16) | (msg[k + 2] << 8) | msg[k + 3];
    else
      w = (msg[k + 3] << 24) | (msg[k + 2] << 16) | (msg[k + 1] << 8) | msg[k];
    res[i] = w >>> 0;
  }
  return res;
}
exports.join32 = join32;

function split32(msg: Array, endian: Number): Object {
  var res: Object = new Array(msg.length * 4);
  for (var i = 0, k = 0; i < msg.length; i++, k += 4) {
    var m: String = msg[i];
    if (endian === 'big') {
      res[k] = m >>> 24;
      res[k + 1] = (m >>> 16) & 0xff;
      res[k + 2] = (m >>> 8) & 0xff;
      res[k + 3] = m & 0xff;
    } else {
      res[k + 3] = m >>> 24;
      res[k + 2] = (m >>> 16) & 0xff;
      res[k + 1] = (m >>> 8) & 0xff;
      res[k] = m & 0xff;
    }
  }
  return res;
}
exports.split32 = split32;

function rotr32(w: Number, b: Number): Number {
  return (w >>> b) | (w << (32 - b));
}
exports.rotr32 = rotr32;

function rotl32(w: Number, b: Number): Number {
  return (w << b) | (w >>> (32 - b));
}
exports.rotl32 = rotl32;

function sum32(a: String, b: String): Number {
  return (a + b) >>> 0;
}
exports.sum32 = sum32;

function sum32_3(a: String, b: String, c: String): Number {
  return (a + b + c) >>> 0;
}
exports.sum32_3 = sum32_3;

function sum32_4(a: String, b: String, c: String, d: String): Number {
  return (a + b + c + d) >>> 0;
}
exports.sum32_4 = sum32_4;

function sum32_5(a: String, b: String, c: String, d: String, e: String): Number {
  return (a + b + c + d + e) >>> 0;
}
exports.sum32_5 = sum32_5;

function sum64(buf: Object, pos: Number, ah: String, al: Number): Void {
  var bh: String = buf[pos];
  var bl: String = buf[pos + 1];

  var lo: Number = (al + bl) >>> 0;
  var hi: String = (lo < al ? 1 : 0) + ah + bh;
  buf[pos] = hi >>> 0;
  buf[pos + 1] = lo;
}
exports.sum64 = sum64;

function sum64_hi(ah: String, al: Number, bh: Number, bl: Number): Number {
  var lo: Number = (al + bl) >>> 0;
  var hi: String = (lo < al ? 1 : 0) + ah + bh;
  return hi >>> 0;
}
exports.sum64_hi = sum64_hi;

function sum64_lo(ah: Function, al: Number, bh: Function, bl: String): Number {
  var lo: String = al + bl;
  return lo >>> 0;
}
exports.sum64_lo = sum64_lo;

function sum64_4_hi(ah: String, al: String, bh: String, bl: String, ch: String, cl: String, dh: String, dl: String): Number {
  var carry: Number = 0;
  var lo: Number = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;

  var hi: String = ah + bh + ch + dh + carry;
  return hi >>> 0;
}
exports.sum64_4_hi = sum64_4_hi;

function sum64_4_lo(ah: Function, al: String, bh: Function, bl: String, ch: String, cl: String, dh: Function, dl: String): Number {
  var lo: String = al + bl + cl + dl;
  return lo >>> 0;
}
exports.sum64_4_lo = sum64_4_lo;

function sum64_5_hi(ah: String, al: String, bh: String, bl: String, ch: String, cl: String, dh: String, dl: String, eh: String, el: String): Number {
  var carry: Number = 0;
  var lo: Number = al;
  lo = (lo + bl) >>> 0;
  carry += lo < al ? 1 : 0;
  lo = (lo + cl) >>> 0;
  carry += lo < cl ? 1 : 0;
  lo = (lo + dl) >>> 0;
  carry += lo < dl ? 1 : 0;
  lo = (lo + el) >>> 0;
  carry += lo < el ? 1 : 0;

  var hi: String = ah + bh + ch + dh + eh + carry;
  return hi >>> 0;
}
exports.sum64_5_hi = sum64_5_hi;

function sum64_5_lo(ah: Function, al: String, bh: Function, bl: String, ch: String, cl: String, dh: Function, dl: String, eh: Function, el: String): Number {
  var lo: String = al + bl + cl + dl + el;

  return lo >>> 0;
}
exports.sum64_5_lo = sum64_5_lo;

function rotr64_hi(ah: String, al: Number, num: Number): Number {
  var r: Number = (al << (32 - num)) | (ah >>> num);
  return r >>> 0;
}
exports.rotr64_hi = rotr64_hi;

function rotr64_lo(ah: Number, al: Number, num: Number): Number {
  var r: Number = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.rotr64_lo = rotr64_lo;

function shr64_hi(ah: String, al: Function, num: Number): Number {
  return ah >>> num;
}
exports.shr64_hi = shr64_hi;

function shr64_lo(ah: Number, al: Number, num: Number): Number {
  var r: Number = (ah << (32 - num)) | (al >>> num);
  return r >>> 0;
}
exports.shr64_lo = shr64_lo;
