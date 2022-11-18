"use strict";
import { isASCIIHex } from './infra';
import { utf8Encode } from './encoding';

function p(char: string): number {
  return char.codePointAt(0);
}

// https://url.spec.whatwg.org/#percent-encode
function percentEncode(c: string): string {
  let hex: string = c.toString(16).toUpperCase();
  if (hex.length === 1) {
    hex = `0${hex}`;
  }

  return `%${hex}`;
}

// https://url.spec.whatwg.org/#percent-decode
function percentDecodeBytes(input: object): any[] {
  const output: any[] = new Uint8Array(input.byteLength);
  let outputIndex: number = 0;
  for (let i = 0; i < input.byteLength; ++i) {
    const byte: string = input[i];
    if (byte !== 0x25) {
      output[outputIndex++] = byte;
    } else if (byte === 0x25 && (!isASCIIHex(input[i + 1]) || !isASCIIHex(input[i + 2]))) {
      output[outputIndex++] = byte;
    } else {
      const bytePoint: number = parseInt(String.fromCodePoint(input[i + 1], input[i + 2]), 16);
      output[outputIndex++] = bytePoint;
      i += 2;
    }
  }

  return output.slice(0, outputIndex);
}

// https://url.spec.whatwg.org/#string-percent-decode
function percentDecodeString(input: Element): boolean {
  const bytes: string = utf8Encode(input);
  return percentDecodeBytes(bytes);
}

// https://url.spec.whatwg.org/#c0-control-percent-encode-set
function isC0ControlPercentEncode(c: number): boolean {
  return c <= 0x1F || c > 0x7E;
}

// https://url.spec.whatwg.org/#fragment-percent-encode-set
const extraFragmentPercentEncodeSet: Error = new Set([p(" "), p("\""), p("<"), p(">"), p("`")]);
function isFragmentPercentEncode(c: string): boolean {
  return isC0ControlPercentEncode(c) || extraFragmentPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#query-percent-encode-set
const extraQueryPercentEncodeSet: Error = new Set([p(" "), p("\""), p("#"), p("<"), p(">")]);
function isQueryPercentEncode(c: string): boolean {
  return isC0ControlPercentEncode(c) || extraQueryPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#special-query-percent-encode-set
function isSpecialQueryPercentEncode(c: string): boolean {
  return isQueryPercentEncode(c) || c === p("'");
}

// https://url.spec.whatwg.org/#path-percent-encode-set
const extraPathPercentEncodeSet: Map = new Set([p("?"), p("`"), p("{"), p("}")]);
function isPathPercentEncode(c: string): boolean {
  return isQueryPercentEncode(c) || extraPathPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#userinfo-percent-encode-set
const extraUserinfoPercentEncodeSet: Error =
  new Set([p("/"), p(":"), p(";"), p("="), p("@"), p("["), p("\\"), p("]"), p("^"), p("|")]);
function isUserinfoPercentEncode(c: string): boolean {
  return isPathPercentEncode(c) || extraUserinfoPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#component-percent-encode-set
const extraComponentPercentEncodeSet: Error = new Set([p("$"), p("%"), p("&"), p("+"), p(",")]);
function isComponentPercentEncode(c: string): boolean {
  return isUserinfoPercentEncode(c) || extraComponentPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#application-x-www-form-urlencoded-percent-encode-set
const extraURLEncodedPercentEncodeSet: object = new Set([p("!"), p("'"), p("("), p(")"), p("~")]);
function isURLEncodedPercentEncode(c: string): boolean {
  return isComponentPercentEncode(c) || extraURLEncodedPercentEncodeSet.has(c);
}

// https://url.spec.whatwg.org/#code-point-percent-encode-after-encoding
// https://url.spec.whatwg.org/#utf-8-percent-encode
// Assuming encoding is always utf-8 allows us to trim one of the logic branches. TODO: support encoding.
// The "-Internal" variant here has code points as JS strings. The external version used by other files has code points
// as JS numbers, like the rest of the codebase.
function utf8PercentEncodeCodePointInternal(codePoint: string, percentEncodePredicate: Function): string {
  const bytes: any[] = utf8Encode(codePoint);
  let output: string = "";
  for (const byte of bytes) {
    // Our percentEncodePredicate operates on bytes, not code points, so this is slightly different from the spec.
    if (!percentEncodePredicate(byte)) {
      output += String.fromCharCode(byte);
    } else {
      output += percentEncode(byte);
    }
  }

  return output;
}

function utf8PercentEncodeCodePoint(codePoint: string, percentEncodePredicate: boolean): boolean {
  return utf8PercentEncodeCodePointInternal(String.fromCodePoint(codePoint), percentEncodePredicate);
}

// https://url.spec.whatwg.org/#string-percent-encode-after-encoding
// https://url.spec.whatwg.org/#string-utf-8-percent-encode
function utf8PercentEncodeString(input: any[], percentEncodePredicate: boolean, spaceAsPlus: boolean = false): string {
  let output: string = "";
  for (const codePoint of input) {
    if (spaceAsPlus && codePoint === " ") {
      output += "+";
    } else {
      output += utf8PercentEncodeCodePointInternal(codePoint, percentEncodePredicate);
    }
  }
  return output;
}

export default {
  isC0ControlPercentEncode,
  isFragmentPercentEncode,
  isQueryPercentEncode,
  isSpecialQueryPercentEncode,
  isPathPercentEncode,
  isUserinfoPercentEncode,
  isURLEncodedPercentEncode,
  percentDecodeString,
  percentDecodeBytes,
  utf8PercentEncodeString,
  utf8PercentEncodeCodePoint
};
