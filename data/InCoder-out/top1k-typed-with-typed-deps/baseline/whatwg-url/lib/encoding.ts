"use strict";
const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder("utf-8", { ignoreBOM: true });

function utf8Encode(string: string | Buffer) {
  return utf8Encoder.encode(string);
}

function utf8DecodeWithoutBOM(bytes: Uint8Array) {
  return utf8Decoder.decode(bytes);
}

module.exports = {
  utf8Encode,
  utf8DecodeWithoutBOM
};