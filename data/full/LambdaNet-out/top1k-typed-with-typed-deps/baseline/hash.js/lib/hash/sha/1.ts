'use strict';

var utils: any[] = require('../utils');
var common: string = require('../common');
var shaCommon: string = require('./common');

var rotl32: object = utils.rotl32;
var sum32: object = utils.sum32;
var sum32_5: Function = utils.sum32_5;
var ft_1: Function = shaCommon.ft_1;
var BlockHash: Function = common.BlockHash;

var sha1_K: any[] = [
  0x5A827999, 0x6ED9EBA1,
  0x8F1BBCDC, 0xCA62C1D6
];

function SHA1(): string {
  if (!(this instanceof SHA1))
    return new SHA1();

  BlockHash.call(this);
  this.h = [
    0x67452301, 0xefcdab89, 0x98badcfe,
    0x10325476, 0xc3d2e1f0 ];
  this.W = new Array(80);
}

utils.inherits(SHA1, BlockHash);
module.exports = SHA1;

SHA1.blockSize = 512;
SHA1.outSize = 160;
SHA1.hmacStrength = 80;
SHA1.padLength = 64;

SHA1.prototype._update = function _update(msg: object, start: number): void {
  var W: any[] = this.W;

  for (var i = 0; i < 16; i++)
    W[i] = msg[start + i];

  for(; i < W.length; i++)
    W[i] = rotl32(W[i - 3] ^ W[i - 8] ^ W[i - 14] ^ W[i - 16], 1);

  var a: string = this.h[0];
  var b: string = this.h[1];
  var c: string = this.h[2];
  var d: string = this.h[3];
  var e: string = this.h[4];

  for (i = 0; i < W.length; i++) {
    var s: number = ~~(i / 20);
    var t: string = sum32_5(rotl32(a, 5), ft_1(s, b, c, d), e, W[i], sha1_K[s]);
    e = d;
    d = c;
    c = rotl32(b, 30);
    b = a;
    a = t;
  }

  this.h[0] = sum32(this.h[0], a);
  this.h[1] = sum32(this.h[1], b);
  this.h[2] = sum32(this.h[2], c);
  this.h[3] = sum32(this.h[3], d);
  this.h[4] = sum32(this.h[4], e);
};

SHA1.prototype._digest = function digest(enc: number): string {
  if (enc === 'hex')
    return utils.toHex32(this.h, 'big');
  else
    return utils.split32(this.h, 'big');
};
