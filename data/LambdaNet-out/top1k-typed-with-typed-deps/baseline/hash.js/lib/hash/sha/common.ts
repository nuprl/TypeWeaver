'use strict';

var utils: String = require('../utils');
var rotr32: Object = utils.rotr32;

function ft_1(s: String, x: String, y: String, z: String): String {
  if (s === 0)
    return ch32(x, y, z);
  if (s === 1 || s === 3)
    return p32(x, y, z);
  if (s === 2)
    return maj32(x, y, z);
}
exports.ft_1 = ft_1;

function ch32(x: Number, y: Number, z: Number): Number {
  return (x & y) ^ ((~x) & z);
}
exports.ch32 = ch32;

function maj32(x: Number, y: Number, z: Number): Number {
  return (x & y) ^ (x & z) ^ (y & z);
}
exports.maj32 = maj32;

function p32(x: String, y: String, z: Number): Number {
  return x ^ y ^ z;
}
exports.p32 = p32;

function s0_256(x: String): Number {
  return rotr32(x, 2) ^ rotr32(x, 13) ^ rotr32(x, 22);
}
exports.s0_256 = s0_256;

function s1_256(x: String): Number {
  return rotr32(x, 6) ^ rotr32(x, 11) ^ rotr32(x, 25);
}
exports.s1_256 = s1_256;

function g0_256(x: String): Number {
  return rotr32(x, 7) ^ rotr32(x, 18) ^ (x >>> 3);
}
exports.g0_256 = g0_256;

function g1_256(x: String): Number {
  return rotr32(x, 17) ^ rotr32(x, 19) ^ (x >>> 10);
}
exports.g1_256 = g1_256;
