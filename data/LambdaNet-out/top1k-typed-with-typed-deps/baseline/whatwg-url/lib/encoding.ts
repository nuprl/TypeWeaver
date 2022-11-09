"use strict";
const utf8Encoder: HTMLElement = new TextEncoder();
const utf8Decoder: HTMLElement = new TextDecoder("utf-8", { ignoreBOM: true });

function utf8Encode(string: String): String {
  return utf8Encoder.encode(string);
}

function utf8DecodeWithoutBOM(bytes: String): Array {
  return utf8Decoder.decode(bytes);
}

module.exports = {
  utf8Encode,
  utf8DecodeWithoutBOM
};
