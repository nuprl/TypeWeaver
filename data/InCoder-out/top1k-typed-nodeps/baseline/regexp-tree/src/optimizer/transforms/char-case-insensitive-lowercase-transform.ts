/**
 * The MIT License (MIT)
 * Copyright (c) 2017-present Dmitry Soshnikov <dmitry.soshnikov@gmail.com>
 */

'use strict';

const UPPER_A_CP = 'A'.codePointAt(0);
const UPPER_Z_CP = 'Z'.codePointAt(0);
/**
 * Transforms case-insensitive regexp to lowercase
 *
 * /AaBbÏ/i -> /aabbï/i
 */
module.exports = {
  _AZClassRanges: null,
  _hasUFlag: false,
  init(ast) {
    this._AZClassRanges = new Set();
    this._hasUFlag = ast.flags.includes('u');
  },
  shouldRun(ast) {
    return ast.flags.includes('i');
  },
  Char(path) {
    const {node, parent} = path;
    if (isNaN(node.codePoint)) {
      return;
    }

    // Engine support for case-insensitive matching without the u flag
    // for characters above \u1000 does not seem reliable.
    if (!this._hasUFlag && node.codePoint >= 0x1000) {
      return;
    }

    if (parent.type === 'ClassRange') {
      // The only class ranges we handle must be inside A-Z.
      // After the `from` char is processed, the isAZClassRange test
      // will be false, so we use a Set to keep track of parents and
      // process the `to` char.
      if (!this._AZClassRanges.has(parent) && !isAZClassRange(parent)) {
        return;
      }
      this._AZClassRanges.add(parent);
    }

    const lower = node.symbol.toLowerCase();
    if (lower !== node.symbol) {
      node.value = displaySymbolAsValue(lower, node);
      node.symbol = lower;
      node.codePoint = lower.codePointAt(0);
    }
  }
};

function isAZClassRange(classRange: ClassRange) {
  const {from, to} = classRange;
  // A-Z
  return from.codePoint >= UPPER_A_CP && from.codePoint <= UPPER_Z_CP &&
    to.codePoint >= UPPER_A_CP && to.codePoint <= UPPER_Z_CP;
}

function displaySymbolAsValue(symbol: Symbol,  node: Node) {
  const codePoint = symbol.codePointAt(0);
  if (node.kind === 'decimal') {
    return '\\' + codePoint;
  }
  if (node.kind === 'oct') {
    return '\\0' + codePoint.toString(8);
  }
  if (node.kind === 'hex') {
    return '\\x' + codePoint.toString(16);
  }
  if (node.kind === 'unicode') {
    if (node.isSurrogatePair) {
      const {lead, trail} = getSurrogatePairFromCodePoint(codePoint);
      return '\\u' + '0'.repeat(4 - lead.length) + lead + '\\u' + '0'.repeat(4 - trail.length) + trail;
    } else if (node.value.includes('{')) {
      return '\\u{' + codePoint.toString(16) + '}';
    } else {
      const code = codePoint.toString(16);
      return '\\u' + '0'.repeat(4 - code.length) + code;
    }
  }
  // simple
  return symbol;
}

/**
 * Converts a code point to a surrogate pair.
 * Conversion algorithm is taken from The Unicode Standard 3.0 Section 3.7
 * (https://www.unicode.org/versions/Unicode3.0.0/ch03.pdf)
 * @param {number} codePoint - Between 0x10000 and 0x10ffff
 * @returns {{lead: string, trail: string}}
 */
function getSurrogatePairFromCodePoint(codePoint: number) {
  const lead = Math.floor((codePoint - 0x10000) / 0x400) + 0xd800;
  const trail = (codePoint - 0x10000) % 0x400 + 0xdc00;
  return {
    lead: lead.toString(16),
    trail: trail.toString(16)
  };
}