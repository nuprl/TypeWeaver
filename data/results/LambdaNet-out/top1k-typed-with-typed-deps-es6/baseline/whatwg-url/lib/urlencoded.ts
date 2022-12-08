"use strict";
import { utf8Encode, utf8DecodeWithoutBOM } from './encoding';
import { percentDecodeBytes, utf8PercentEncodeString, isURLEncodedPercentEncode } from './percent-encoding';

function p(char: string): string {
  return char.codePointAt(0);
}

// https://url.spec.whatwg.org/#concept-urlencoded-parser
function parseUrlencoded(input: Element): any[] {
  const sequences: any[] = strictlySplitByteSequence(input, p("&"));
  const output: any[] = [];
  for (const bytes of sequences) {
    if (bytes.length === 0) {
      continue;
    }

    let name: string, value: any[];
    const indexOfEqual: number = bytes.indexOf(p("="));

    if (indexOfEqual >= 0) {
      name = bytes.slice(0, indexOfEqual);
      value = bytes.slice(indexOfEqual + 1);
    } else {
      name = bytes;
      value = new Uint8Array(0);
    }

    name = replaceByteInByteSequence(name, 0x2B, 0x20);
    value = replaceByteInByteSequence(value, 0x2B, 0x20);

    const nameString: string = utf8DecodeWithoutBOM(percentDecodeBytes(name));
    const valueString: string = utf8DecodeWithoutBOM(percentDecodeBytes(value));

    output.push([nameString, valueString]);
  }
  return output;
}

// https://url.spec.whatwg.org/#concept-urlencoded-string-parser
function parseUrlencodedString(input: Element): string {
  return parseUrlencoded(utf8Encode(input));
}

// https://url.spec.whatwg.org/#concept-urlencoded-serializer
function serializeUrlencoded(tuples: Map, encodingOverride: string = undefined): string {
  let encoding: string = "utf-8";
  if (encodingOverride !== undefined) {
    // TODO "get the output encoding", i.e. handle encoding labels vs. names.
    encoding = encodingOverride;
  }

  let output: string = "";
  for (const [i, tuple] of tuples.entries()) {
    // TODO: handle encoding override

    const name: string = utf8PercentEncodeString(tuple[0], isURLEncodedPercentEncode, true);

    let value: string = tuple[1];
    if (tuple.length > 2 && tuple[2] !== undefined) {
      if (tuple[2] === "hidden" && name === "_charset_") {
        value = encoding;
      } else if (tuple[2] === "file") {
        // value is a File object
        value = value.name;
      }
    }

    value = utf8PercentEncodeString(value, isURLEncodedPercentEncode, true);

    if (i !== 0) {
      output += "&";
    }
    output += `${name}=${value}`;
  }
  return output;
}

function strictlySplitByteSequence(buf: string, cp: string): any[] {
  const list: any[] = [];
  let last: number = 0;
  let i: number = buf.indexOf(cp);
  while (i >= 0) {
    list.push(buf.slice(last, i));
    last = i + 1;
    i = buf.indexOf(cp, last);
  }
  if (last !== buf.length) {
    list.push(buf.slice(last));
  }
  return list;
}

function replaceByteInByteSequence(buf: any[], from: string, to: string): any[] {
  let i: number = buf.indexOf(from);
  while (i >= 0) {
    buf[i] = to;
    i = buf.indexOf(from, i + 1);
  }
  return buf;
}

export default {
  parseUrlencodedString,
  serializeUrlencoded
};
