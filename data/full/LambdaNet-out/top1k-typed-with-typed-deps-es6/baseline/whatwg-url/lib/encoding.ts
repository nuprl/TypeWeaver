"use strict";
const utf8Encoder: HTMLElement = new TextEncoder();
const utf8Decoder: HTMLElement = new TextDecoder("utf-8", { ignoreBOM: true });

function utf8Encode(string: string): any[] {
  return utf8Encoder.encode(string);
}

function utf8DecodeWithoutBOM(bytes: string): Promise {
  return utf8Decoder.decode(bytes);
}

export default {
  utf8Encode,
  utf8DecodeWithoutBOM
};
