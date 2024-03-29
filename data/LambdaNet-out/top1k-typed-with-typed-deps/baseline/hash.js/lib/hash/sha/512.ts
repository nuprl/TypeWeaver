'use strict';

var utils: HTMLElement = require('../utils');
var common: string = require('../common');
var assert: Function = require('minimalistic-assert');

var rotr64_hi: object = utils.rotr64_hi;
var rotr64_lo: object = utils.rotr64_lo;
var shr64_hi: Function = utils.shr64_hi;
var shr64_lo: Function = utils.shr64_lo;
var sum64: object = utils.sum64;
var sum64_hi: Function = utils.sum64_hi;
var sum64_lo: Function = utils.sum64_lo;
var sum64_4_hi: Function = utils.sum64_4_hi;
var sum64_4_lo: Function = utils.sum64_4_lo;
var sum64_5_hi: Function = utils.sum64_5_hi;
var sum64_5_lo: Function = utils.sum64_5_lo;

var BlockHash: Function = common.BlockHash;

var sha512_K: any[] = [
  0x428a2f98, 0xd728ae22, 0x71374491, 0x23ef65cd,
  0xb5c0fbcf, 0xec4d3b2f, 0xe9b5dba5, 0x8189dbbc,
  0x3956c25b, 0xf348b538, 0x59f111f1, 0xb605d019,
  0x923f82a4, 0xaf194f9b, 0xab1c5ed5, 0xda6d8118,
  0xd807aa98, 0xa3030242, 0x12835b01, 0x45706fbe,
  0x243185be, 0x4ee4b28c, 0x550c7dc3, 0xd5ffb4e2,
  0x72be5d74, 0xf27b896f, 0x80deb1fe, 0x3b1696b1,
  0x9bdc06a7, 0x25c71235, 0xc19bf174, 0xcf692694,
  0xe49b69c1, 0x9ef14ad2, 0xefbe4786, 0x384f25e3,
  0x0fc19dc6, 0x8b8cd5b5, 0x240ca1cc, 0x77ac9c65,
  0x2de92c6f, 0x592b0275, 0x4a7484aa, 0x6ea6e483,
  0x5cb0a9dc, 0xbd41fbd4, 0x76f988da, 0x831153b5,
  0x983e5152, 0xee66dfab, 0xa831c66d, 0x2db43210,
  0xb00327c8, 0x98fb213f, 0xbf597fc7, 0xbeef0ee4,
  0xc6e00bf3, 0x3da88fc2, 0xd5a79147, 0x930aa725,
  0x06ca6351, 0xe003826f, 0x14292967, 0x0a0e6e70,
  0x27b70a85, 0x46d22ffc, 0x2e1b2138, 0x5c26c926,
  0x4d2c6dfc, 0x5ac42aed, 0x53380d13, 0x9d95b3df,
  0x650a7354, 0x8baf63de, 0x766a0abb, 0x3c77b2a8,
  0x81c2c92e, 0x47edaee6, 0x92722c85, 0x1482353b,
  0xa2bfe8a1, 0x4cf10364, 0xa81a664b, 0xbc423001,
  0xc24b8b70, 0xd0f89791, 0xc76c51a3, 0x0654be30,
  0xd192e819, 0xd6ef5218, 0xd6990624, 0x5565a910,
  0xf40e3585, 0x5771202a, 0x106aa070, 0x32bbd1b8,
  0x19a4c116, 0xb8d2d0c8, 0x1e376c08, 0x5141ab53,
  0x2748774c, 0xdf8eeb99, 0x34b0bcb5, 0xe19b48a8,
  0x391c0cb3, 0xc5c95a63, 0x4ed8aa4a, 0xe3418acb,
  0x5b9cca4f, 0x7763e373, 0x682e6ff3, 0xd6b2b8a3,
  0x748f82ee, 0x5defb2fc, 0x78a5636f, 0x43172f60,
  0x84c87814, 0xa1f0ab72, 0x8cc70208, 0x1a6439ec,
  0x90befffa, 0x23631e28, 0xa4506ceb, 0xde82bde9,
  0xbef9a3f7, 0xb2c67915, 0xc67178f2, 0xe372532b,
  0xca273ece, 0xea26619c, 0xd186b8c7, 0x21c0c207,
  0xeada7dd6, 0xcde0eb1e, 0xf57d4f7f, 0xee6ed178,
  0x06f067aa, 0x72176fba, 0x0a637dc5, 0xa2c898a6,
  0x113f9804, 0xbef90dae, 0x1b710b35, 0x131c471b,
  0x28db77f5, 0x23047d84, 0x32caab7b, 0x40c72493,
  0x3c9ebe0a, 0x15c9bebc, 0x431d67c4, 0x9c100d4c,
  0x4cc5d4be, 0xcb3e42b6, 0x597f299c, 0xfc657e2a,
  0x5fcb6fab, 0x3ad6faec, 0x6c44198c, 0x4a475817
];

function SHA512(): string {
  if (!(this instanceof SHA512))
    return new SHA512();

  BlockHash.call(this);
  this.h = [
    0x6a09e667, 0xf3bcc908,
    0xbb67ae85, 0x84caa73b,
    0x3c6ef372, 0xfe94f82b,
    0xa54ff53a, 0x5f1d36f1,
    0x510e527f, 0xade682d1,
    0x9b05688c, 0x2b3e6c1f,
    0x1f83d9ab, 0xfb41bd6b,
    0x5be0cd19, 0x137e2179 ];
  this.k = sha512_K;
  this.W = new Array(160);
}
utils.inherits(SHA512, BlockHash);
module.exports = SHA512;

SHA512.blockSize = 1024;
SHA512.outSize = 512;
SHA512.hmacStrength = 192;
SHA512.padLength = 128;

SHA512.prototype._prepareBlock = function _prepareBlock(msg: object, start: number): void {
  var W: object = this.W;

  // 32 x 32bit words
  for (var i = 0; i < 32; i++)
    W[i] = msg[start + i];
  for (; i < W.length; i += 2) {
    var c0_hi: Function = g1_512_hi(W[i - 4], W[i - 3]);  // i - 2
    var c0_lo: Function = g1_512_lo(W[i - 4], W[i - 3]);
    var c1_hi: string = W[i - 14];  // i - 7
    var c1_lo: string = W[i - 13];
    var c2_hi: Function = g0_512_hi(W[i - 30], W[i - 29]);  // i - 15
    var c2_lo: Function = g0_512_lo(W[i - 30], W[i - 29]);
    var c3_hi: string = W[i - 32];  // i - 16
    var c3_lo: string = W[i - 31];

    W[i] = sum64_4_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
    W[i + 1] = sum64_4_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo);
  }
};

SHA512.prototype._update = function _update(msg: string, start: string): void {
  this._prepareBlock(msg, start);

  var W: any[] = this.W;

  var ah: string = this.h[0];
  var al: string = this.h[1];
  var bh: string = this.h[2];
  var bl: string = this.h[3];
  var ch: string = this.h[4];
  var cl: string = this.h[5];
  var dh: string = this.h[6];
  var dl: string = this.h[7];
  var eh: string = this.h[8];
  var el: string = this.h[9];
  var fh: string = this.h[10];
  var fl: string = this.h[11];
  var gh: string = this.h[12];
  var gl: string = this.h[13];
  var hh: Function = this.h[14];
  var hl: string = this.h[15];

  assert(this.k.length === W.length);
  for (var i = 0; i < W.length; i += 2) {
    var c0_hi: string = hh;
    var c0_lo: string = hl;
    var c1_hi: Function = s1_512_hi(eh, el);
    var c1_lo: Function = s1_512_lo(eh, el);
    var c2_hi: string = ch64_hi(eh, el, fh, fl, gh, gl);
    var c2_lo: Function = ch64_lo(eh, el, fh, fl, gh, gl);
    var c3_hi: Function = this.k[i];
    var c3_lo: string = this.k[i + 1];
    var c4_hi: string = W[i];
    var c4_lo: string = W[i + 1];

    var T1_hi: string = sum64_5_hi(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);
    var T1_lo: string = sum64_5_lo(
      c0_hi, c0_lo,
      c1_hi, c1_lo,
      c2_hi, c2_lo,
      c3_hi, c3_lo,
      c4_hi, c4_lo);

    c0_hi = s0_512_hi(ah, al);
    c0_lo = s0_512_lo(ah, al);
    c1_hi = maj64_hi(ah, al, bh, bl, ch, cl);
    c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);

    var T2_hi: string = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
    var T2_lo: string = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);

    hh = gh;
    hl = gl;

    gh = fh;
    gl = fl;

    fh = eh;
    fl = el;

    eh = sum64_hi(dh, dl, T1_hi, T1_lo);
    el = sum64_lo(dl, dl, T1_hi, T1_lo);

    dh = ch;
    dl = cl;

    ch = bh;
    cl = bl;

    bh = ah;
    bl = al;

    ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
    al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
  }

  sum64(this.h, 0, ah, al);
  sum64(this.h, 2, bh, bl);
  sum64(this.h, 4, ch, cl);
  sum64(this.h, 6, dh, dl);
  sum64(this.h, 8, eh, el);
  sum64(this.h, 10, fh, fl);
  sum64(this.h, 12, gh, gl);
  sum64(this.h, 14, hh, hl);
};

SHA512.prototype._digest = function digest(enc: number): string {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};

function ch64_hi(xh: number, xl: Function, yh: number, yl: Function, zh: number): number {
  var r: number = (xh & yh) ^ ((~xh) & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function ch64_lo(xh: Function, xl: number, yh: Function, yl: number, zh: Function, zl: number): number {
  var r: number = (xl & yl) ^ ((~xl) & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_hi(xh: number, xl: Function, yh: number, yl: Function, zh: number): number {
  var r: number = (xh & yh) ^ (xh & zh) ^ (yh & zh);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function maj64_lo(xh: Function, xl: number, yh: Function, yl: number, zh: Function, zl: number): number {
  var r: number = (xl & yl) ^ (xl & zl) ^ (yl & zl);
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_hi(xh: Function, xl: string): number {
  var c0_hi: string = rotr64_hi(xh, xl, 28);
  var c1_hi: string = rotr64_hi(xl, xh, 2);  // 34
  var c2_hi: string = rotr64_hi(xl, xh, 7);  // 39

  var r: number = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s0_512_lo(xh: Function, xl: string): number {
  var c0_lo: string = rotr64_lo(xh, xl, 28);
  var c1_lo: string = rotr64_lo(xl, xh, 2);  // 34
  var c2_lo: string = rotr64_lo(xl, xh, 7);  // 39

  var r: number = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_hi(xh: Function, xl: Function): number {
  var c0_hi: string = rotr64_hi(xh, xl, 14);
  var c1_hi: string = rotr64_hi(xh, xl, 18);
  var c2_hi: string = rotr64_hi(xl, xh, 9);  // 41

  var r: number = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function s1_512_lo(xh: Function, xl: string): number {
  var c0_lo: string = rotr64_lo(xh, xl, 14);
  var c1_lo: string = rotr64_lo(xh, xl, 18);
  var c2_lo: string = rotr64_lo(xl, xh, 9);  // 41

  var r: number = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_hi(xh: string, xl: string): number {
  var c0_hi: string = rotr64_hi(xh, xl, 1);
  var c1_hi: string = rotr64_hi(xh, xl, 8);
  var c2_hi: string = shr64_hi(xh, xl, 7);

  var r: number = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g0_512_lo(xh: string, xl: string): number {
  var c0_lo: string = rotr64_lo(xh, xl, 1);
  var c1_lo: string = rotr64_lo(xh, xl, 8);
  var c2_lo: string = shr64_lo(xh, xl, 7);

  var r: number = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_hi(xh: Function, xl: string): number {
  var c0_hi: string = rotr64_hi(xh, xl, 19);
  var c1_hi: string = rotr64_hi(xl, xh, 29);  // 61
  var c2_hi: string = shr64_hi(xh, xl, 6);

  var r: number = c0_hi ^ c1_hi ^ c2_hi;
  if (r < 0)
    r += 0x100000000;
  return r;
}

function g1_512_lo(xh: Function, xl: string): number {
  var c0_lo: string = rotr64_lo(xh, xl, 19);
  var c1_lo: string = rotr64_lo(xl, xh, 29);  // 61
  var c2_lo: string = shr64_lo(xh, xl, 6);

  var r: number = c0_lo ^ c1_lo ^ c2_lo;
  if (r < 0)
    r += 0x100000000;
  return r;
}
