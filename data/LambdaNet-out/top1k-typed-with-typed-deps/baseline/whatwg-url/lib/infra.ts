"use strict";

// Note that we take code points as JS numbers, not JS strings.

function isASCIIDigit(c: Number): Boolean {
  return c >= 0x30 && c <= 0x39;
}

function isASCIIAlpha(c: Number): Boolean {
  return (c >= 0x41 && c <= 0x5A) || (c >= 0x61 && c <= 0x7A);
}

function isASCIIAlphanumeric(c: String): Boolean {
  return isASCIIAlpha(c) || isASCIIDigit(c);
}

function isASCIIHex(c: Number): Boolean {
  return isASCIIDigit(c) || (c >= 0x41 && c <= 0x46) || (c >= 0x61 && c <= 0x66);
}

module.exports = {
  isASCIIDigit,
  isASCIIAlpha,
  isASCIIAlphanumeric,
  isASCIIHex
};
