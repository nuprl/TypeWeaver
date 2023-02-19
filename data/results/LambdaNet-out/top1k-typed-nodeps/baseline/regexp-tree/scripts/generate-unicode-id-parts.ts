// based on https://github.com/microsoft/TypeScript/tree/master/scripts/regenerate-unicode-identifier-parts.js

/** @param {number} i */
function toHex4Digits(i: NonSurrogateRange): string {
  let s: string = i.toString(16);
  while (s.length < 4) {
    s = '0' + s;
  }
  if (s.length > 4) throw new Error('Invalid Hex4Digits value');
  return s;
}

class NonSurrogateRange {
  /** @param {number} codePoint */
  constructor(codePoint) {
    this.firstCodePoint = codePoint;
    this.lastCodePoint = codePoint;
  }
  toString() {
    let text: string = '\\u' + toHex4Digits(this.firstCodePoint);
    if (this.lastCodePoint !== this.firstCodePoint) {
      text += '-\\u' + toHex4Digits(this.lastCodePoint);
    }
    return text;
  }
}

class LeadSurrogateRange {
  /** @param {number} leadSurrogate */
  constructor(leadSurrogate) {
    this.leadSurrogate = leadSurrogate;
    /** @type {TrailSurrogateRange[]} */
    this.ranges = [];
  }

  toString() {
    return (
      '\\u' +
      toHex4Digits(this.leadSurrogate) +
      '[' +
      this.ranges.join('') +
      ']'
    );
  }
}

class TrailSurrogateRange {
  /** @param {number} trailSurrogate */
  constructor(trailSurrogate) {
    this.firstTrailSurrogate = trailSurrogate;
    this.lastTrailSurrogate = trailSurrogate;
  }
  toString() {
    let text: string = '\\u' + toHex4Digits(this.firstTrailSurrogate);
    if (this.lastTrailSurrogate !== this.firstTrailSurrogate) {
      text += '-\\u' + toHex4Digits(this.lastTrailSurrogate);
    }
    return text;
  }
}

class Writer {
  constructor() {
    /** @type {number} */
    this.lastCodePoint = -1;
    /** @type {NonSurrogateRange[]} */
    this.nonSurrogateRanges = [];
    /** @type {LeadSurrogateRange[]} */
    this.surrogateRanges = [];
    /** @type {NonSurrogateRange} */
    this.nonSurrogateRange;
    /** @type {LeadSurrogateRange} */
    this.leadSurrogateRange;
    /** @type {TrailSurrogateRange} */
    this.trailSurrogateRange;
  }

  /** @param {number} codePoint */
  push(codePoint) {
    if (codePoint <= this.lastCodePoint)
      throw new Error('Code points must be added in order.');
    this.lastCodePoint = codePoint;

    if (codePoint < MAX_UNICODE_NON_SURROGATE) {
      if (
        this.nonSurrogateRange &&
        this.nonSurrogateRange.lastCodePoint === codePoint - 1
      ) {
        this.nonSurrogateRange.lastCodePoint = codePoint;
        return;
      }
      this.nonSurrogateRange = new NonSurrogateRange(codePoint);
      this.nonSurrogateRanges.push(this.nonSurrogateRange);
    } else {
      const leadSurrogate: number = Math.floor((codePoint - 0x10000) / 0x400) + 0xd800;
      const trailSurrogate: number = ((codePoint - 0x10000) % 0x400) + 0xdc00;
      if (
        !this.leadSurrogateRange ||
        this.leadSurrogateRange.leadSurrogate !== leadSurrogate
      ) {
        this.trailSurrogateRange = undefined;
        this.leadSurrogateRange = new LeadSurrogateRange(leadSurrogate);
        this.surrogateRanges.push(this.leadSurrogateRange);
      }

      if (
        this.trailSurrogateRange &&
        this.trailSurrogateRange.lastTrailSurrogate === trailSurrogate - 1
      ) {
        this.trailSurrogateRange.lastTrailSurrogate = trailSurrogate;
        return;
      }

      this.trailSurrogateRange = new TrailSurrogateRange(trailSurrogate);
      this.leadSurrogateRange.ranges.push(this.trailSurrogateRange);
    }
  }

  toString() {
    let first: string = this.nonSurrogateRanges.join('');
    let second: string = this.surrogateRanges.join('|');
    return first && second
      ? `([${first}]|${second})`
      : first
      ? `[${first}]`
      : second
      ? `(${second})`
      : '';
  }
}

const MAX_UNICODE_NON_SURROGATE: number = 0xffff;
const MAX_UNICODE_CODEPOINT: number = 0x10ffff;
const isStart: Function = (c: string) => /\p{ID_Start}/u.test(c);
const isContinue: Function = (c: string) => /\p{ID_Continue}/u.test(c);

let idStartWriter: any[] = new Writer();
let idContinueWriter: any[] = new Writer();

for (let cp = 0; cp <= MAX_UNICODE_CODEPOINT; cp++) {
  const ch: string = String.fromCodePoint(cp);
  if (isStart(ch)) {
    idStartWriter.push(cp);
  }
  if (isContinue(ch)) {
    idContinueWriter.push(cp);
  }
}

console.log(`/**
* Generated by scripts/generate-unicode-id-parts.js on node ${
  process.version
} with unicode ${process.versions.unicode}
* based on http://www.unicode.org/reports/tr31/ and https://tc39.es/ecma262/#sec-names-and-keywords
* U_ID_START corresponds to the ID_Start property, and U_ID_CONTINUE corresponds to ID_Continue property.
*/`);
console.log('U_ID_START              ' + idStartWriter.toString());
console.log('U_ID_CONTINUE           ' + idContinueWriter.toString());
