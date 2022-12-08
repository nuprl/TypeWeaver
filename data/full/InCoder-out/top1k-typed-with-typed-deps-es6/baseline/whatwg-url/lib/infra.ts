"use strict";

// Note that we take code points as JS numbers, not JS strings.

function isASCIIDigit(c: number) {
  return c >= 0x30 && c <= 0x39;
}

function isASCIIAlpha(c: number) {
  return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A);
}

function isASCIIAlphanumeric(c: number) {
  return isASCIIAlpha(c) || isASCIIDigit(c);
}

function isASCIIHex(c: number) {
  return isASCIIDigit(c) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66);
}

export default {
  isASCIIDigit,
  isASCIIAlpha,
  isASCIIAlphanumeric,
  isASCIIHex
};