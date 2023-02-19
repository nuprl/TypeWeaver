let asm: object, asmBuffer: object, allocSize: number = 2<<19, addr: string;

const copy: Function = new Uint8Array(new Uint16Array([1]).buffer)[0] === 1 ? function (src: string, outBuf16: object) {
  const len: number = src.length;
  let i: number = 0;
  while (i < len)
    outBuf16[i] = src.charCodeAt(i++);
} : function (src: string, outBuf16: object) {
  const len: number = src.length;
  let i: number = 0;
  while (i < len) {
    const ch: number = src.charCodeAt(i);
    outBuf16[i++] = (ch & 0xff) << 8 | ch >>> 8;
  }
};
const words: string = 'xportmportlassetafromsyncunctionssertvoyiedelecontininstantybreareturdebuggeawaithrwhileforifcatcfinallels';

let source: string, name: string;
export function parse (_source: any[], _name: string = '@'): any[] {
  source = _source;
  name = _name;
  // 2 bytes per string code point
  // + analysis space (2^17)
  // remaining space is EMCC stack space (2^17)
  const memBound: number = source.length * 2 + (2 << 18);
  if (memBound > allocSize || !asm) {
    while (memBound > allocSize) allocSize *= 2;
    asmBuffer = new ArrayBuffer(allocSize);
    copy(words, new Uint16Array(asmBuffer, 16, words.length));
    asm = asmInit(typeof self !== 'undefined' ? self : global, {}, asmBuffer);
    // lexer.c bulk allocates string space + analysis space
    addr = asm.su(allocSize - (2<<17));
  }
  const len: number = source.length + 1;
  asm.ses(addr);
  asm.sa(len - 1);

  copy(source, new Uint16Array(asmBuffer, addr, len));

  if (!asm.p()) {
    acornPos = asm.e();
    syntaxError();
  }

  const imports: any[] = [], exports: any[] = [];
  while (asm.ri()) {
    const s: number = asm.is(), e: Function = asm.ie(), a: string = asm.ai(), d: number = asm.id(), ss: Function = asm.ss(), se: any[] = asm.se();
    let n: any[];
    if (asm.ip())
      n = readString(d === -1 ? s : s + 1, source.charCodeAt(d === -1 ? s - 1 : s));
    imports.push({ n, s, e, ss, se, d, a });
  }
  while (asm.re()) {
    const s: number = asm.es(), e: Function = asm.ee(), ls: number = asm.els(), le: string = asm.ele();
    const ch: number = source.charCodeAt(s);
    const lch: number = ls >= 0 ? source.charCodeAt(ls) : -1;
    exports.push({
      s, e, ls, le,
      n: (ch === 34 || ch === 39) ? readString(s + 1, ch) : source.slice(s, e),
      ln: ls < 0 ? undefined : (lch === 34 || lch === 39) ? readString(ls + 1, lch) : source.slice(ls, le),
    });
  }

  return [imports, exports, !!asm.f()];
}

/*
 * Ported from Acorn
 *   
 * MIT License

 * Copyright (C) 2012-2020 by various contributors (see AUTHORS)

 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:

 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.

 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */
let acornPos: number;
function readString (start: number, quote: number): string {
  acornPos = start;
  let out: string = '', chunkStart: number = acornPos;
  for (;;) {
    if (acornPos >= source.length) syntaxError();
    const ch: number = source.charCodeAt(acornPos);
    if (ch === quote) break;
    if (ch === 92) { // '\'
      out += source.slice(chunkStart, acornPos);
      out += readEscapedChar();
      chunkStart = acornPos;
    }
    else if (ch === 0x2028 || ch === 0x2029) {
      ++acornPos;
    }
    else {
      if (isBr(ch)) syntaxError();
      ++acornPos;
    }
  }
  out += source.slice(chunkStart, acornPos++);
  return out;
}

// Used to read escaped characters

function readEscapedChar (): number {
  let ch: number = source.charCodeAt(++acornPos);
  ++acornPos;
  switch (ch) {
    case 110: return '\n'; // 'n' -> '\n'
    case 114: return '\r'; // 'r' -> '\r'
    case 120: return String.fromCharCode(readHexChar(2)); // 'x'
    case 117: return readCodePointToString(); // 'u'
    case 116: return '\t'; // 't' -> '\t'
    case 98: return '\b'; // 'b' -> '\b'
    case 118: return '\u000b'; // 'v' -> '\u000b'
    case 102: return '\f'; // 'f' -> '\f'
    case 13: if (source.charCodeAt(acornPos) === 10) ++acornPos; // '\r\n'
    case 10: // ' \n'
      return '';
    case 56:
    case 57:
      syntaxError();
    default:
      if (ch >= 48 && ch <= 55) {
        let octalStr: string = source.substr(acornPos - 1, 3).match(/^[0-7]+/)[0];
        let octal: number = parseInt(octalStr, 8);
        if (octal > 255) {
          octalStr = octalStr.slice(0, -1);
          octal = parseInt(octalStr, 8);
        }
        acornPos += octalStr.length - 1;
        ch = source.charCodeAt(acornPos);
        if (octalStr !== '0' || ch === 56 || ch === 57)
          syntaxError();
        return String.fromCharCode(octal);
      }
      if (isBr(ch)) {
        // Unicode new line characters after \ get removed from output in both
        // template literals and strings
        return '';
      }
      return String.fromCharCode(ch);
  }
}

// Used to read character escape sequences ('\x', '\u', '\U').

function readHexChar (len: number): number {
  const start: number = acornPos;
  let total: number = 0, lastCode: number = 0;
  for (let i = 0; i < len; ++i, ++acornPos) {
    let code: number = source.charCodeAt(acornPos), val: number;

    if (code === 95) {
      if (lastCode === 95 || i === 0) syntaxError();
      lastCode = code;
      continue;
    }

    if (code >= 97) val = code - 97 + 10; // a
    else if (code >= 65) val = code - 65 + 10; // A
    else if (code >= 48 && code <= 57) val = code - 48; // 0-9
    else break;
    if (val >= 16) break;
    lastCode = code;
    total = total * 16 + val;
  }

  if (lastCode === 95 || acornPos - start !== len) syntaxError();

  return total;
}

// Read a string value, interpreting backslash-escapes.

function readCodePointToString (): number {
  const ch: number = source.charCodeAt(acornPos);
  let code: number;
  if (ch === 123) { // '{'
    ++acornPos;
    code = readHexChar(source.indexOf('}', acornPos) - acornPos);
    ++acornPos;
    if (code > 0x10FFFF) syntaxError();
  } else {
    code = readHexChar(4);
  }
  // UTF-16 Decoding
  if (code <= 0xFFFF) return String.fromCharCode(code);
  code -= 0x10000;
  return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00);
}

function isBr (c: number): boolean {
  return c === 13/*\r*/ || c === 10/*\n*/;
}

function syntaxError (): void {
  throw Object.assign(new Error(`Parse error ${name}:${source.slice(0, acornPos).split('\n').length}:${acornPos - source.lastIndexOf('\n', acornPos - 1)}`), { idx: acornPos });
}

// function asmInit () { ... } from lib/lexer.asm.js is concatenated at the end here
