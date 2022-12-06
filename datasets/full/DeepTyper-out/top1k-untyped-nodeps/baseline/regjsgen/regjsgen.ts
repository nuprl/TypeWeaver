/*!
 * regjsgen 0.5.2
 * Copyright 2014-2020 Benjamin Tan <https://ofcr.se/>
 * Available under the MIT license <https://github.com/bnjmnt4n/regjsgen/blob/master/LICENSE-MIT.txt>
 */
;(function() {
  'use strict';

  // Used to determine if values are of the language type `Object`.
  var objectTypes: any = {
    'function': true,
    'object': true
  };

  // Used as a reference to the global object.
  var root: any = (objectTypes[typeof window] && window) || this;

  // Detect free variable `exports`.
  var freeExports: any = objectTypes[typeof exports] && exports && !exports.nodeType && exports;

  // Detect free variable `module`.
  var hasFreeModule: any = objectTypes[typeof module] && module && !module.nodeType;

  // Detect free variable `global` from Node.js or Browserified code and use it as `root`.
  var freeGlobal: boolean = freeExports && hasFreeModule && typeof global == 'object' && global;
  if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
    root = freeGlobal;
  }

  // Used to check objects for own properties.
  var hasOwnProperty: any = Object.prototype.hasOwnProperty;

  /*--------------------------------------------------------------------------*/

  // Generates a string based on the given code point.
  // Based on https://mths.be/fromcodepoint by @mathias.
  function fromCodePoint(): string {
    var codePoint: number = Number(arguments[0]);

    if (
      !isFinite(codePoint) || // `NaN`, `+Infinity`, or `-Infinity`
      codePoint < 0 || // not a valid Unicode code point
      codePoint > 0x10FFFF || // not a valid Unicode code point
      Math.floor(codePoint) != codePoint // not an integer
    ) {
      throw RangeError('Invalid code point: ' + codePoint);
    }

    if (codePoint <= 0xFFFF) {
      // BMP code point
      return String.fromCharCode(codePoint);
    } else {
      // Astral code point; split in surrogate halves
      // http://mathiasbynens.be/notes/javascript-encoding#surrogate-formulae
      codePoint -= 0x10000;
      var highSurrogate: number = (codePoint >> 10) + 0xD800;
      var lowSurrogate: number = (codePoint % 0x400) + 0xDC00;
      return String.fromCharCode(highSurrogate, lowSurrogate);
    }
  }

  /*--------------------------------------------------------------------------*/

  // Ensures that nodes have the correct types.
  var assertTypeRegexMap: {} = {};
  function assertType(type, expected: string): void {
    if (expected.indexOf('|') == -1) {
      if (type == expected) {
        return;
      }

      throw Error('Invalid node type: ' + type + '; expected type: ' + expected);
    }

    expected = hasOwnProperty.call(assertTypeRegexMap, expected)
      ? assertTypeRegexMap[expected]
      : (assertTypeRegexMap[expected] = RegExp('^(?:' + expected + ')$'));

    if (expected.test(type)) {
      return;
    }

    throw Error('Invalid node type: ' + type + '; expected types: ' + expected);
  }

  /*--------------------------------------------------------------------------*/

  // Generates a regular expression string based on an AST.
  function generate(node: any): string {
    var type = node.type;

    if (hasOwnProperty.call(generators, type)) {
      return generators[type](node);
    }

    throw Error('Invalid node type: ' + type);
  }

  // Constructs a string by concatentating the output of each term.
  function generateSequence(generator: any, terms: any, /* optional */  separator: string): string {
    var i: number = -1,
        length = terms.length,
        result = '',
        term;

    while (++i < length) {
      term = terms[i];

      if (separator && i > 0) result += separator;

      // Ensure that `\0` null escapes followed by number symbols are not
      // treated as backreferences.
      if (
        i + 1 < length &&
        terms[i].type == 'value' &&
        terms[i].kind == 'null' &&
        terms[i + 1].type == 'value' &&
        terms[i + 1].kind == 'symbol' &&
        terms[i + 1].codePoint >= 48 &&
        terms[i + 1].codePoint <= 57
      ) {
        result += '\\000';
        continue;
      }

      result += generator(term);
    }

    return result;
  }

  /*--------------------------------------------------------------------------*/

  function generateAlternative(node: any): string {
    assertType(node.type, 'alternative');

    return generateSequence(generateTerm, node.body);
  }

  function generateAnchor(node: any): boolean {
    assertType(node.type, 'anchor');

    switch (node.kind) {
      case 'start':
        return '^';
      case 'end':
        return '$';
      case 'boundary':
        return '\\b';
      case 'not-boundary':
        return '\\B';
      default:
        throw Error('Invalid assertion');
    }
  }

  var atomType: string = 'anchor|characterClass|characterClassEscape|dot|group|reference|unicodePropertyEscape|value';

  function generateAtom(node: any): string {
    assertType(node.type, atomType);

    return generate(node);
  }

  function generateCharacterClass(node: any): string {
    assertType(node.type, 'characterClass');

    var kind: any = node.kind;
    var separator: string = kind === 'intersection' ? '&&' : kind === 'subtraction' ? '--' : '';

    return '[' +
      (node.negative ? '^' : '') +
      generateSequence(generateClassAtom, node.body, separator) +
    ']';
  }

  function generateCharacterClassEscape(node: any): string {
    assertType(node.type, 'characterClassEscape');

    return '\\' + node.value;
  }

  function generateCharacterClassRange(node: any): string {
    assertType(node.type, 'characterClassRange');

    var min: any = node.min,
        max = node.max;

    if (min.type == 'characterClassRange' || max.type == 'characterClassRange') {
      throw Error('Invalid character class range');
    }

    return generateClassAtom(min) + '-' + generateClassAtom(max);
  }

  function generateClassAtom(node: any): string {
    assertType(node.type, 'anchor|characterClass|characterClassEscape|characterClassRange|dot|value|unicodePropertyEscape|classStrings');

    return generate(node);
  }

  function generateClassStrings(node: any): string {
    assertType(node.type, 'classStrings');

    return '\\q{' + generateSequence(generateClassString, node.strings, '|') + '}';
  }

  function generateClassString(node: any): string {
    assertType(node.type, 'classString');

    return generateSequence(generate, node.characters);
  }

  function generateDisjunction(node: any): void {
    assertType(node.type, 'disjunction');

    return generateSequence(generate, node.body, '|');
  }


  function generateDot(node: any): string {
    assertType(node.type, 'dot');

    return '.';
  }

  function generateGroup(node: any): void {
    assertType(node.type, 'group');

    var result: string = '';

    switch (node.behavior) {
      case 'normal':
        if (node.name) {
          result += '?<' + generateIdentifier(node.name) + '>';
        }
        break;
      case 'ignore':
        result += '?:';
        break;
      case 'lookahead':
        result += '?=';
        break;
      case 'negativeLookahead':
        result += '?!';
        break;
      case 'lookbehind':
        result += '?<=';
        break;
      case 'negativeLookbehind':
        result += '?<!';
        break;
      default:
        throw Error('Invalid behaviour: ' + node.behaviour);
    }

    result += generateSequence(generate, node.body);

    return '(' + result + ')';
  }

  function generateIdentifier(node: any): string {
    assertType(node.type, 'identifier');

    return node.value;
  }

  function generateQuantifier(node: any): string {
    assertType(node.type, 'quantifier');

    var quantifier: string = '',
        min = node.min,
        max = node.max;

    if (max == null) {
      if (min == 0) {
        quantifier = '*';
      } else if (min == 1) {
        quantifier = '+';
      } else {
        quantifier = '{' + min + ',}';
      }
    } else if (min == max) {
      quantifier = '{' + min + '}';
    } else if (min == 0 && max == 1) {
      quantifier = '?';
    } else {
      quantifier = '{' + min + ',' + max + '}';
    }

    if (!node.greedy) {
      quantifier += '?';
    }

    return generateAtom(node.body[0]) + quantifier;
  }

  function generateReference(node: any): string {
    assertType(node.type, 'reference');

    if (node.matchIndex) {
      return '\\' + node.matchIndex;
    }
    if (node.name) {
      return '\\k<' + generateIdentifier(node.name) + '>';
    }

    throw new Error('Unknown reference type');
  }

  function generateTerm(node: any): string {
    assertType(node.type, atomType + '|empty|quantifier');

    return generate(node);
  }

  function generateUnicodePropertyEscape(node: any): string {
    assertType(node.type, 'unicodePropertyEscape');

    return '\\' + (node.negative ? 'P' : 'p') + '{' + node.value + '}';
  }

  function generateValue(node: any): string {
    assertType(node.type, 'value');

    var kind: any = node.kind,
        codePoint = node.codePoint;

    if (typeof codePoint != 'number') {
      throw new Error('Invalid code point: ' + codePoint);
    }

    switch (kind) {
      case 'controlLetter':
        return '\\c' + fromCodePoint(codePoint + 64);
      case 'hexadecimalEscape':
        return '\\x' + ('00' + codePoint.toString(16).toUpperCase()).slice(-2);
      case 'identifier':
        return '\\' + fromCodePoint(codePoint);
      case 'null':
        return '\\' + codePoint;
      case 'octal':
        return '\\' + ('000' + codePoint.toString(8)).slice(-3);
      case 'singleEscape':
        switch (codePoint) {
          case 0x0008:
            return '\\b';
          case 0x0009:
            return '\\t';
          case 0x000A:
            return '\\n';
          case 0x000B:
            return '\\v';
          case 0x000C:
            return '\\f';
          case 0x000D:
            return '\\r';
          case 0x002D:
            return '\\-';
          default:
            throw Error('Invalid code point: ' + codePoint);
        }
      case 'symbol':
        return fromCodePoint(codePoint);
      case 'unicodeEscape':
        return '\\u' + ('0000' + codePoint.toString(16).toUpperCase()).slice(-4);
      case 'unicodeCodePointEscape':
        return '\\u{' + codePoint.toString(16).toUpperCase() + '}';
      default:
        throw Error('Unsupported node kind: ' + kind);
    }
  }

  /*--------------------------------------------------------------------------*/

  // Used to generate strings for each node type.
  var generators: any = {
    'alternative': generateAlternative,
    'anchor': generateAnchor,
    'characterClass': generateCharacterClass,
    'characterClassEscape': generateCharacterClassEscape,
    'characterClassRange': generateCharacterClassRange,
    'classStrings': generateClassStrings,
    'disjunction': generateDisjunction,
    'dot': generateDot,
    'group': generateGroup,
    'quantifier': generateQuantifier,
    'reference': generateReference,
    'unicodePropertyEscape': generateUnicodePropertyEscape,
    'value': generateValue
  };

  /*--------------------------------------------------------------------------*/

  // Export regjsgen.
  var regjsgen: any = {
    'generate': generate
  };

  // Some AMD build optimizers, like r.js, check for condition patterns like the following:
  if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
    // Define as an anonymous module so it can be aliased through path mapping.
    define(function() {
      return regjsgen;
    });

    root.regjsgen = regjsgen;
  }
  // Check for `exports` after `define` in case a build optimizer adds an `exports` object.
  else if (freeExports && hasFreeModule) {
    // Export for CommonJS support.
    freeExports.generate = generate;
  }
  else {
    // Export to the global object.
    root.regjsgen = regjsgen;
  }
}.call(this));
