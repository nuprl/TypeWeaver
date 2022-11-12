"use strict";
import tr46 from 'tr46';
import infra from './infra';
import { utf8DecodeWithoutBOM } from './encoding';

import {
  percentDecodeString,
  utf8PercentEncodeCodePoint,
  utf8PercentEncodeString,
  isC0ControlPercentEncode,
  isFragmentPercentEncode,
  isQueryPercentEncode,
  isSpecialQueryPercentEncode,
  isPathPercentEncode,
  isUserinfoPercentEncode,
} from './percent-encoding';

function p(char: String): Number {
  return char.codePointAt(0);
}

const specialSchemes: Object = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

const failure: Number = Symbol("failure");

function countSymbols(str: Array): Number {
  return [...str].length;
}

function at(input: Object, idx: String): String {
  const c: String = input[idx];
  return isNaN(c) ? undefined : String.fromCodePoint(c);
}

function isSingleDot(buffer: Object): Boolean {
  return buffer === "." || buffer.toLowerCase() === "%2e";
}

function isDoubleDot(buffer: Number): Boolean {
  buffer = buffer.toLowerCase();
  return buffer === ".." || buffer === "%2e." || buffer === ".%2e" || buffer === "%2e%2e";
}

function isWindowsDriveLetterCodePoints(cp1: String, cp2: Number): Boolean {
  return infra.isASCIIAlpha(cp1) && (cp2 === p(":") || cp2 === p("|"));
}

function isWindowsDriveLetterString(string: Array): Boolean {
  return string.length === 2 && infra.isASCIIAlpha(string.codePointAt(0)) && (string[1] === ":" || string[1] === "|");
}

function isNormalizedWindowsDriveLetterString(string: String): Boolean {
  return string.length === 2 && infra.isASCIIAlpha(string.codePointAt(0)) && string[1] === ":";
}

function containsForbiddenHostCodePoint(string: String): Boolean {
  return string.search(/\u0000|\u0009|\u000A|\u000D|\u0020|#|\/|:|<|>|\?|@|\[|\\|\]|\^|\|/u) !== -1;
}

function containsForbiddenDomainCodePoint(string: String): Boolean {
  return containsForbiddenHostCodePoint(string) || string.search(/[\u0000-\u001F]|%|\u007F/u) !== -1;
}

function isSpecialScheme(scheme: String): Boolean {
  return specialSchemes[scheme] !== undefined;
}

function isSpecial(url: String): Boolean {
  return isSpecialScheme(url.scheme);
}

function isNotSpecial(url: String): Boolean {
  return !isSpecialScheme(url.scheme);
}

function defaultPort(scheme: String): String {
  return specialSchemes[scheme];
}

function parseIPv4Number(input: String): Number {
  if (input === "") {
    return failure;
  }

  let R: Number = 10;

  if (input.length >= 2 && input.charAt(0) === "0" && input.charAt(1).toLowerCase() === "x") {
    input = input.substring(2);
    R = 16;
  } else if (input.length >= 2 && input.charAt(0) === "0") {
    input = input.substring(1);
    R = 8;
  }

  if (input === "") {
    return 0;
  }

  let regex: RegExp = /[^0-7]/u;
  if (R === 10) {
    regex = /[^0-9]/u;
  }
  if (R === 16) {
    regex = /[^0-9A-Fa-f]/u;
  }

  if (regex.test(input)) {
    return failure;
  }

  return parseInt(input, R);
}

function parseIPv4(input: HTMLElement): Number {
  const parts: Array = input.split(".");
  if (parts[parts.length - 1] === "") {
    if (parts.length > 1) {
      parts.pop();
    }
  }

  if (parts.length > 4) {
    return failure;
  }

  const numbers: Array = [];
  for (const part of parts) {
    const n: String = parseIPv4Number(part);
    if (n === failure) {
      return failure;
    }

    numbers.push(n);
  }

  for (let i = 0; i < numbers.length - 1; ++i) {
    if (numbers[i] > 255) {
      return failure;
    }
  }
  if (numbers[numbers.length - 1] >= 256 ** (5 - numbers.length)) {
    return failure;
  }

  let ipv4: String = numbers.pop();
  let counter: Number = 0;

  for (const n of numbers) {
    ipv4 += n * 256 ** (3 - counter);
    ++counter;
  }

  return ipv4;
}

function serializeIPv4(address: Number): String {
  let output: String = "";
  let n: Number = address;

  for (let i = 1; i <= 4; ++i) {
    output = String(n % 256) + output;
    if (i !== 4) {
      output = `.${output}`;
    }
    n = Math.floor(n / 256);
  }

  return output;
}

function parseIPv6(input: Object): Object {
  const address: Object = [0, 0, 0, 0, 0, 0, 0, 0];
  let pieceIndex: Number = 0;
  let compress: Number = null;
  let pointer: Number = 0;

  input = Array.from(input, (c: Array) => c.codePointAt(0));

  if (input[pointer] === p(":")) {
    if (input[pointer + 1] !== p(":")) {
      return failure;
    }

    pointer += 2;
    ++pieceIndex;
    compress = pieceIndex;
  }

  while (pointer < input.length) {
    if (pieceIndex === 8) {
      return failure;
    }

    if (input[pointer] === p(":")) {
      if (compress !== null) {
        return failure;
      }
      ++pointer;
      ++pieceIndex;
      compress = pieceIndex;
      continue;
    }

    let value: Number = 0;
    let length: Number = 0;

    while (length < 4 && infra.isASCIIHex(input[pointer])) {
      value = value * 0x10 + parseInt(at(input, pointer), 16);
      ++pointer;
      ++length;
    }

    if (input[pointer] === p(".")) {
      if (length === 0) {
        return failure;
      }

      pointer -= length;

      if (pieceIndex > 6) {
        return failure;
      }

      let numbersSeen: Number = 0;

      while (input[pointer] !== undefined) {
        let ipv4Piece: Number = null;

        if (numbersSeen > 0) {
          if (input[pointer] === p(".") && numbersSeen < 4) {
            ++pointer;
          } else {
            return failure;
          }
        }

        if (!infra.isASCIIDigit(input[pointer])) {
          return failure;
        }

        while (infra.isASCIIDigit(input[pointer])) {
          const number: Number = parseInt(at(input, pointer));
          if (ipv4Piece === null) {
            ipv4Piece = number;
          } else if (ipv4Piece === 0) {
            return failure;
          } else {
            ipv4Piece = ipv4Piece * 10 + number;
          }
          if (ipv4Piece > 255) {
            return failure;
          }
          ++pointer;
        }

        address[pieceIndex] = address[pieceIndex] * 0x100 + ipv4Piece;

        ++numbersSeen;

        if (numbersSeen === 2 || numbersSeen === 4) {
          ++pieceIndex;
        }
      }

      if (numbersSeen !== 4) {
        return failure;
      }

      break;
    } else if (input[pointer] === p(":")) {
      ++pointer;
      if (input[pointer] === undefined) {
        return failure;
      }
    } else if (input[pointer] !== undefined) {
      return failure;
    }

    address[pieceIndex] = value;
    ++pieceIndex;
  }

  if (compress !== null) {
    let swaps: Number = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex !== 0 && swaps > 0) {
      const temp: String = address[compress + swaps - 1];
      address[compress + swaps - 1] = address[pieceIndex];
      address[pieceIndex] = temp;
      --pieceIndex;
      --swaps;
    }
  } else if (compress === null && pieceIndex !== 8) {
    return failure;
  }

  return address;
}

function serializeIPv6(address: Object): String {
  let output: String = "";
  const compress: Number = findLongestZeroSequence(address);
  let ignore0: Boolean = false;

  for (let pieceIndex = 0; pieceIndex <= 7; ++pieceIndex) {
    if (ignore0 && address[pieceIndex] === 0) {
      continue;
    } else if (ignore0) {
      ignore0 = false;
    }

    if (compress === pieceIndex) {
      const separator: String = pieceIndex === 0 ? "::" : ":";
      output += separator;
      ignore0 = true;
      continue;
    }

    output += address[pieceIndex].toString(16);

    if (pieceIndex !== 7) {
      output += ":";
    }
  }

  return output;
}

function parseHost(input: Array, isNotSpecialArg: Boolean = false): Number {
  if (input[0] === "[") {
    if (input[input.length - 1] !== "]") {
      return failure;
    }

    return parseIPv6(input.substring(1, input.length - 1));
  }

  if (isNotSpecialArg) {
    return parseOpaqueHost(input);
  }

  const domain: String = utf8DecodeWithoutBOM(percentDecodeString(input));
  const asciiDomain: String = domainToASCII(domain);
  if (asciiDomain === failure) {
    return failure;
  }

  if (containsForbiddenDomainCodePoint(asciiDomain)) {
    return failure;
  }

  if (endsInANumber(asciiDomain)) {
    return parseIPv4(asciiDomain);
  }

  return asciiDomain;
}

function endsInANumber(input: Array): Boolean {
  const parts: Array = input.split(".");
  if (parts[parts.length - 1] === "") {
    if (parts.length === 1) {
      return false;
    }
    parts.pop();
  }

  const last: String = parts[parts.length - 1];
  if (parseIPv4Number(last) !== failure) {
    return true;
  }

  if (/^[0-9]+$/u.test(last)) {
    return true;
  }

  return false;
}

function parseOpaqueHost(input: Element): Boolean {
  if (containsForbiddenHostCodePoint(input)) {
    return failure;
  }

  return utf8PercentEncodeString(input, isC0ControlPercentEncode);
}

function findLongestZeroSequence(arr: Array): Number {
  let maxIdx: String = null;
  let maxLen: Number = 1; // only find elements > 1
  let currStart: Number = null;
  let currLen: Number = 0;

  for (let i = 0; i < arr.length; ++i) {
    if (arr[i] !== 0) {
      if (currLen > maxLen) {
        maxIdx = currStart;
        maxLen = currLen;
      }

      currStart = null;
      currLen = 0;
    } else {
      if (currStart === null) {
        currStart = i;
      }
      ++currLen;
    }
  }

  // if trailing zeros
  if (currLen > maxLen) {
    return currStart;
  }

  return maxIdx;
}

function serializeHost(host: String): String {
  if (typeof host === "number") {
    return serializeIPv4(host);
  }

  // IPv6 serializer
  if (host instanceof Array) {
    return `[${serializeIPv6(host)}]`;
  }

  return host;
}

function domainToASCII(domain: String, beStrict: String = false): Boolean {
  const result: Number = tr46.toASCII(domain, {
    checkBidi: true,
    checkHyphens: false,
    checkJoiners: true,
    useSTD3ASCIIRules: beStrict,
    verifyDNSLength: beStrict
  });
  if (result === null || result === "") {
    return failure;
  }
  return result;
}

function trimControlChars(url: String): Boolean {
  return url.replace(/^[\u0000-\u001F\u0020]+|[\u0000-\u001F\u0020]+$/ug, "");
}

function trimTabAndNewline(url: String): Boolean {
  return url.replace(/\u0009|\u000A|\u000D/ug, "");
}

function shortenPath(url: String): Void {
  const { path } = url;
  if (path.length === 0) {
    return;
  }
  if (url.scheme === "file" && path.length === 1 && isNormalizedWindowsDriveLetter(path[0])) {
    return;
  }

  path.pop();
}

function includesCredentials(url: String): Boolean {
  return url.username !== "" || url.password !== "";
}

function cannotHaveAUsernamePasswordPort(url: String): Boolean {
  return url.host === null || url.host === "" || url.scheme === "file";
}

function hasAnOpaquePath(url: String): Boolean {
  return typeof url.path === "string";
}

function isNormalizedWindowsDriveLetter(string: String): Boolean {
  return /^[A-Za-z]:$/u.test(string);
}

function URLStateMachine(input: Element, base: String, encodingOverride: Number, url: String, stateOverride: String): Void {
  this.pointer = 0;
  this.input = input;
  this.base = base || null;
  this.encodingOverride = encodingOverride || "utf-8";
  this.stateOverride = stateOverride;
  this.url = url;
  this.failure = false;
  this.parseError = false;

  if (!this.url) {
    this.url = {
      scheme: "",
      username: "",
      password: "",
      host: null,
      port: null,
      path: [],
      query: null,
      fragment: null
    };

    const res: String = trimControlChars(this.input);
    if (res !== this.input) {
      this.parseError = true;
    }
    this.input = res;
  }

  const res: String = trimTabAndNewline(this.input);
  if (res !== this.input) {
    this.parseError = true;
  }
  this.input = res;

  this.state = stateOverride || "scheme start";

  this.buffer = "";
  this.atFlag = false;
  this.arrFlag = false;
  this.passwordTokenSeenFlag = false;

  this.input = Array.from(this.input, (c: Array) => c.codePointAt(0));

  for (; this.pointer <= this.input.length; ++this.pointer) {
    const c: String = this.input[this.pointer];
    const cStr: String = isNaN(c) ? undefined : String.fromCodePoint(c);

    // exec state machine
    const ret: Boolean = this[`parse ${this.state}`](c, cStr);
    if (!ret) {
      break; // terminate algorithm
    } else if (ret === failure) {
      this.failure = true;
      break;
    }
  }
}

URLStateMachine.prototype["parse scheme start"] = function parseSchemeStart(c: Number, cStr: String): Boolean {
  if (infra.isASCIIAlpha(c)) {
    this.buffer += cStr.toLowerCase();
    this.state = "scheme";
  } else if (!this.stateOverride) {
    this.state = "no scheme";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse scheme"] = function parseScheme(c: Number, cStr: String): Boolean {
  if (infra.isASCIIAlphanumeric(c) || c === p("+") || c === p("-") || c === p(".")) {
    this.buffer += cStr.toLowerCase();
  } else if (c === p(":")) {
    if (this.stateOverride) {
      if (isSpecial(this.url) && !isSpecialScheme(this.buffer)) {
        return false;
      }

      if (!isSpecial(this.url) && isSpecialScheme(this.buffer)) {
        return false;
      }

      if ((includesCredentials(this.url) || this.url.port !== null) && this.buffer === "file") {
        return false;
      }

      if (this.url.scheme === "file" && this.url.host === "") {
        return false;
      }
    }
    this.url.scheme = this.buffer;
    if (this.stateOverride) {
      if (this.url.port === defaultPort(this.url.scheme)) {
        this.url.port = null;
      }
      return false;
    }
    this.buffer = "";
    if (this.url.scheme === "file") {
      if (this.input[this.pointer + 1] !== p("/") || this.input[this.pointer + 2] !== p("/")) {
        this.parseError = true;
      }
      this.state = "file";
    } else if (isSpecial(this.url) && this.base !== null && this.base.scheme === this.url.scheme) {
      this.state = "special relative or authority";
    } else if (isSpecial(this.url)) {
      this.state = "special authority slashes";
    } else if (this.input[this.pointer + 1] === p("/")) {
      this.state = "path or authority";
      ++this.pointer;
    } else {
      this.url.path = "";
      this.state = "opaque path";
    }
  } else if (!this.stateOverride) {
    this.buffer = "";
    this.state = "no scheme";
    this.pointer = -1;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

URLStateMachine.prototype["parse no scheme"] = function parseNoScheme(c: Number): Boolean {
  if (this.base === null || (hasAnOpaquePath(this.base) && c !== p("#"))) {
    return failure;
  } else if (hasAnOpaquePath(this.base) && c === p("#")) {
    this.url.scheme = this.base.scheme;
    this.url.path = this.base.path;
    this.url.query = this.base.query;
    this.url.fragment = "";
    this.state = "fragment";
  } else if (this.base.scheme === "file") {
    this.state = "file";
    --this.pointer;
  } else {
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special relative or authority"] = function parseSpecialRelativeOrAuthority(c: Number): Boolean {
  if (c === p("/") && this.input[this.pointer + 1] === p("/")) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "relative";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse path or authority"] = function parsePathOrAuthority(c: Number): Boolean {
  if (c === p("/")) {
    this.state = "authority";
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse relative"] = function parseRelative(c: Number): Boolean {
  this.url.scheme = this.base.scheme;
  if (c === p("/")) {
    this.state = "relative slash";
  } else if (isSpecial(this.url) && c === p("\\")) {
    this.parseError = true;
    this.state = "relative slash";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    if (c === p("?")) {
      this.url.query = "";
      this.state = "query";
    } else if (c === p("#")) {
      this.url.fragment = "";
      this.state = "fragment";
    } else if (!isNaN(c)) {
      this.url.query = null;
      this.url.path.pop();
      this.state = "path";
      --this.pointer;
    }
  }

  return true;
};

URLStateMachine.prototype["parse relative slash"] = function parseRelativeSlash(c: Number): Boolean {
  if (isSpecial(this.url) && (c === p("/") || c === p("\\"))) {
    if (c === p("\\")) {
      this.parseError = true;
    }
    this.state = "special authority ignore slashes";
  } else if (c === p("/")) {
    this.state = "authority";
  } else {
    this.url.username = this.base.username;
    this.url.password = this.base.password;
    this.url.host = this.base.host;
    this.url.port = this.base.port;
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority slashes"] = function parseSpecialAuthoritySlashes(c: Number): Boolean {
  if (c === p("/") && this.input[this.pointer + 1] === p("/")) {
    this.state = "special authority ignore slashes";
    ++this.pointer;
  } else {
    this.parseError = true;
    this.state = "special authority ignore slashes";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse special authority ignore slashes"] = function parseSpecialAuthorityIgnoreSlashes(c: Number): Boolean {
  if (c !== p("/") && c !== p("\\")) {
    this.state = "authority";
    --this.pointer;
  } else {
    this.parseError = true;
  }

  return true;
};

URLStateMachine.prototype["parse authority"] = function parseAuthority(c: Number, cStr: String): Boolean {
  if (c === p("@")) {
    this.parseError = true;
    if (this.atFlag) {
      this.buffer = `%40${this.buffer}`;
    }
    this.atFlag = true;

    // careful, this is based on buffer and has its own pointer (this.pointer != pointer) and inner chars
    const len: String = countSymbols(this.buffer);
    for (let pointer = 0; pointer < len; ++pointer) {
      const codePoint: String = this.buffer.codePointAt(pointer);

      if (codePoint === p(":") && !this.passwordTokenSeenFlag) {
        this.passwordTokenSeenFlag = true;
        continue;
      }
      const encodedCodePoints: String = utf8PercentEncodeCodePoint(codePoint, isUserinfoPercentEncode);
      if (this.passwordTokenSeenFlag) {
        this.url.password += encodedCodePoints;
      } else {
        this.url.username += encodedCodePoints;
      }
    }
    this.buffer = "";
  } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") ||
             (isSpecial(this.url) && c === p("\\"))) {
    if (this.atFlag && this.buffer === "") {
      this.parseError = true;
      return failure;
    }
    this.pointer -= countSymbols(this.buffer) + 1;
    this.buffer = "";
    this.state = "host";
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse hostname"] =
URLStateMachine.prototype["parse host"] = function parseHostName(c: Number, cStr: String): Boolean {
  if (this.stateOverride && this.url.scheme === "file") {
    --this.pointer;
    this.state = "file host";
  } else if (c === p(":") && !this.arrFlag) {
    if (this.buffer === "") {
      this.parseError = true;
      return failure;
    }

    if (this.stateOverride === "hostname") {
      return false;
    }

    const host: String = parseHost(this.buffer, isNotSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "port";
  } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") ||
             (isSpecial(this.url) && c === p("\\"))) {
    --this.pointer;
    if (isSpecial(this.url) && this.buffer === "") {
      this.parseError = true;
      return failure;
    } else if (this.stateOverride && this.buffer === "" &&
               (includesCredentials(this.url) || this.url.port !== null)) {
      this.parseError = true;
      return false;
    }

    const host: String = parseHost(this.buffer, isNotSpecial(this.url));
    if (host === failure) {
      return failure;
    }

    this.url.host = host;
    this.buffer = "";
    this.state = "path start";
    if (this.stateOverride) {
      return false;
    }
  } else {
    if (c === p("[")) {
      this.arrFlag = true;
    } else if (c === p("]")) {
      this.arrFlag = false;
    }
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse port"] = function parsePort(c: Number, cStr: String): Boolean {
  if (infra.isASCIIDigit(c)) {
    this.buffer += cStr;
  } else if (isNaN(c) || c === p("/") || c === p("?") || c === p("#") ||
             (isSpecial(this.url) && c === p("\\")) ||
             this.stateOverride) {
    if (this.buffer !== "") {
      const port: Number = parseInt(this.buffer);
      if (port > 2 ** 16 - 1) {
        this.parseError = true;
        return failure;
      }
      this.url.port = port === defaultPort(this.url.scheme) ? null : port;
      this.buffer = "";
    }
    if (this.stateOverride) {
      return false;
    }
    this.state = "path start";
    --this.pointer;
  } else {
    this.parseError = true;
    return failure;
  }

  return true;
};

const fileOtherwiseCodePoints: Map = new Set([p("/"), p("\\"), p("?"), p("#")]);

function startsWithWindowsDriveLetter(input: Array, pointer: Number): Boolean {
  const length: Number = input.length - pointer;
  return length >= 2 &&
    isWindowsDriveLetterCodePoints(input[pointer], input[pointer + 1]) &&
    (length === 2 || fileOtherwiseCodePoints.has(input[pointer + 2]));
}

URLStateMachine.prototype["parse file"] = function parseFile(c: Number): Boolean {
  this.url.scheme = "file";
  this.url.host = "";

  if (c === p("/") || c === p("\\")) {
    if (c === p("\\")) {
      this.parseError = true;
    }
    this.state = "file slash";
  } else if (this.base !== null && this.base.scheme === "file") {
    this.url.host = this.base.host;
    this.url.path = this.base.path.slice();
    this.url.query = this.base.query;
    if (c === p("?")) {
      this.url.query = "";
      this.state = "query";
    } else if (c === p("#")) {
      this.url.fragment = "";
      this.state = "fragment";
    } else if (!isNaN(c)) {
      this.url.query = null;
      if (!startsWithWindowsDriveLetter(this.input, this.pointer)) {
        shortenPath(this.url);
      } else {
        this.parseError = true;
        this.url.path = [];
      }

      this.state = "path";
      --this.pointer;
    }
  } else {
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file slash"] = function parseFileSlash(c: Number): Boolean {
  if (c === p("/") || c === p("\\")) {
    if (c === p("\\")) {
      this.parseError = true;
    }
    this.state = "file host";
  } else {
    if (this.base !== null && this.base.scheme === "file") {
      if (!startsWithWindowsDriveLetter(this.input, this.pointer) &&
          isNormalizedWindowsDriveLetterString(this.base.path[0])) {
        this.url.path.push(this.base.path[0]);
      }
      this.url.host = this.base.host;
    }
    this.state = "path";
    --this.pointer;
  }

  return true;
};

URLStateMachine.prototype["parse file host"] = function parseFileHost(c: Number, cStr: String): Boolean {
  if (isNaN(c) || c === p("/") || c === p("\\") || c === p("?") || c === p("#")) {
    --this.pointer;
    if (!this.stateOverride && isWindowsDriveLetterString(this.buffer)) {
      this.parseError = true;
      this.state = "path";
    } else if (this.buffer === "") {
      this.url.host = "";
      if (this.stateOverride) {
        return false;
      }
      this.state = "path start";
    } else {
      let host: String = parseHost(this.buffer, isNotSpecial(this.url));
      if (host === failure) {
        return failure;
      }
      if (host === "localhost") {
        host = "";
      }
      this.url.host = host;

      if (this.stateOverride) {
        return false;
      }

      this.buffer = "";
      this.state = "path start";
    }
  } else {
    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse path start"] = function parsePathStart(c: Number): Boolean {
  if (isSpecial(this.url)) {
    if (c === p("\\")) {
      this.parseError = true;
    }
    this.state = "path";

    if (c !== p("/") && c !== p("\\")) {
      --this.pointer;
    }
  } else if (!this.stateOverride && c === p("?")) {
    this.url.query = "";
    this.state = "query";
  } else if (!this.stateOverride && c === p("#")) {
    this.url.fragment = "";
    this.state = "fragment";
  } else if (c !== undefined) {
    this.state = "path";
    if (c !== p("/")) {
      --this.pointer;
    }
  } else if (this.stateOverride && this.url.host === null) {
    this.url.path.push("");
  }

  return true;
};

URLStateMachine.prototype["parse path"] = function parsePath(c: Number): Boolean {
  if (isNaN(c) || c === p("/") || (isSpecial(this.url) && c === p("\\")) ||
      (!this.stateOverride && (c === p("?") || c === p("#")))) {
    if (isSpecial(this.url) && c === p("\\")) {
      this.parseError = true;
    }

    if (isDoubleDot(this.buffer)) {
      shortenPath(this.url);
      if (c !== p("/") && !(isSpecial(this.url) && c === p("\\"))) {
        this.url.path.push("");
      }
    } else if (isSingleDot(this.buffer) && c !== p("/") &&
               !(isSpecial(this.url) && c === p("\\"))) {
      this.url.path.push("");
    } else if (!isSingleDot(this.buffer)) {
      if (this.url.scheme === "file" && this.url.path.length === 0 && isWindowsDriveLetterString(this.buffer)) {
        this.buffer = `${this.buffer[0]}:`;
      }
      this.url.path.push(this.buffer);
    }
    this.buffer = "";
    if (c === p("?")) {
      this.url.query = "";
      this.state = "query";
    }
    if (c === p("#")) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === p("%") &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += utf8PercentEncodeCodePoint(c, isPathPercentEncode);
  }

  return true;
};

URLStateMachine.prototype["parse opaque path"] = function parseOpaquePath(c: Number): Boolean {
  if (c === p("?")) {
    this.url.query = "";
    this.state = "query";
  } else if (c === p("#")) {
    this.url.fragment = "";
    this.state = "fragment";
  } else {
    // TODO: Add: not a URL code point
    if (!isNaN(c) && c !== p("%")) {
      this.parseError = true;
    }

    if (c === p("%") &&
        (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
         !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    if (!isNaN(c)) {
      this.url.path += utf8PercentEncodeCodePoint(c, isC0ControlPercentEncode);
    }
  }

  return true;
};

URLStateMachine.prototype["parse query"] = function parseQuery(c: Number, cStr: String): Boolean {
  if (!isSpecial(this.url) || this.url.scheme === "ws" || this.url.scheme === "wss") {
    this.encodingOverride = "utf-8";
  }

  if ((!this.stateOverride && c === p("#")) || isNaN(c)) {
    const queryPercentEncodePredicate: Function = isSpecial(this.url) ? isSpecialQueryPercentEncode : isQueryPercentEncode;
    this.url.query += utf8PercentEncodeString(this.buffer, queryPercentEncodePredicate);

    this.buffer = "";

    if (c === p("#")) {
      this.url.fragment = "";
      this.state = "fragment";
    }
  } else if (!isNaN(c)) {
    // TODO: If c is not a URL code point and not "%", parse error.

    if (c === p("%") &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.buffer += cStr;
  }

  return true;
};

URLStateMachine.prototype["parse fragment"] = function parseFragment(c: Number): Boolean {
  if (!isNaN(c)) {
    // TODO: If c is not a URL code point and not "%", parse error.
    if (c === p("%") &&
      (!infra.isASCIIHex(this.input[this.pointer + 1]) ||
        !infra.isASCIIHex(this.input[this.pointer + 2]))) {
      this.parseError = true;
    }

    this.url.fragment += utf8PercentEncodeCodePoint(c, isFragmentPercentEncode);
  }

  return true;
};

function serializeURL(url: String, excludeFragment: Boolean): String {
  let output: String = `${url.scheme}:`;
  if (url.host !== null) {
    output += "//";

    if (url.username !== "" || url.password !== "") {
      output += url.username;
      if (url.password !== "") {
        output += `:${url.password}`;
      }
      output += "@";
    }

    output += serializeHost(url.host);

    if (url.port !== null) {
      output += `:${url.port}`;
    }
  }

  if (url.host === null && !hasAnOpaquePath(url) && url.path.length > 1 && url.path[0] === "") {
    output += "/.";
  }
  output += serializePath(url);

  if (url.query !== null) {
    output += `?${url.query}`;
  }

  if (!excludeFragment && url.fragment !== null) {
    output += `#${url.fragment}`;
  }

  return output;
}

function serializeOrigin(tuple: Object): String {
  let result: String = `${tuple.scheme}://`;
  result += serializeHost(tuple.host);

  if (tuple.port !== null) {
    result += `:${tuple.port}`;
  }

  return result;
}

function serializePath(url: String): String {
  if (hasAnOpaquePath(url)) {
    return url.path;
  }

  let output: String = "";
  for (const segment of url.path) {
    output += `/${segment}`;
  }
  return output;
}

module.exports.serializeURL = serializeURL;

module.exports.serializePath = serializePath;

module.exports.serializeURLOrigin = function (url: String) {
  // https://url.spec.whatwg.org/#concept-url-origin
  switch (url.scheme) {
    case "blob":
      try {
        return module.exports.serializeURLOrigin(module.exports.parseURL(serializePath(url)));
      } catch (e) {
        // serializing an opaque origin returns "null"
        return "null";
      }
    case "ftp":
    case "http":
    case "https":
    case "ws":
    case "wss":
      return serializeOrigin({
        scheme: url.scheme,
        host: url.host,
        port: url.port
      });
    case "file":
      // The spec says:
      // > Unfortunate as it is, this is left as an exercise to the reader. When in doubt, return a new opaque origin.
      // Browsers tested so far:
      // - Chrome says "file://", but treats file: URLs as cross-origin for most (all?) purposes; see e.g.
      //   https://bugs.chromium.org/p/chromium/issues/detail?id=37586
      // - Firefox says "null", but treats file: URLs as same-origin sometimes based on directory stuff; see
      //   https://developer.mozilla.org/en-US/docs/Archive/Misc_top_level/Same-origin_policy_for_file:_URIs
      return "null";
    default:
      // serializing an opaque origin returns "null"
      return "null";
  }
};

module.exports.basicURLParse = function (input: Element, options: Object) {
  if (options === undefined) {
    options = {};
  }

  const usm: HTMLElement = new URLStateMachine(input, options.baseURL, options.encodingOverride, options.url, options.stateOverride);
  if (usm.failure) {
    return null;
  }

  return usm.url;
};

module.exports.setTheUsername = function (url: String, username: String) {
  url.username = utf8PercentEncodeString(username, isUserinfoPercentEncode);
};

module.exports.setThePassword = function (url: String, password: String) {
  url.password = utf8PercentEncodeString(password, isUserinfoPercentEncode);
};

module.exports.serializeHost = serializeHost;

module.exports.cannotHaveAUsernamePasswordPort = cannotHaveAUsernamePasswordPort;

module.exports.hasAnOpaquePath = hasAnOpaquePath;

module.exports.serializeInteger = function (integer: String) {
  return String(integer);
};

module.exports.parseURL = function (input: HTMLElement, options: Object) {
  if (options === undefined) {
    options = {};
  }

  // We don't handle blobs, so this just delegates:
  return module.exports.basicURLParse(input, { baseURL: options.baseURL, encodingOverride: options.encodingOverride });
};
