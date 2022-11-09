/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

import isNumber from 'is-number';

const toRegexRange: Function = (min: Number, max: Number, options: Object) => {
  if (isNumber(min) === false) {
    throw new TypeError('toRegexRange: expected the first argument to be a number');
  }

  if (max === void 0 || min === max) {
    return String(min);
  }

  if (isNumber(max) === false) {
    throw new TypeError('toRegexRange: expected the second argument to be a number.');
  }

  let opts: Object = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === 'boolean') {
    opts.relaxZeros = opts.strictZeros === false;
  }

  let relax: String = String(opts.relaxZeros);
  let shorthand: String = String(opts.shorthand);
  let capture: String = String(opts.capture);
  let wrap: String = String(opts.wrap);
  let cacheKey: String = min + ':' + max + '=' + relax + shorthand + capture + wrap;

  if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange.cache[cacheKey].result;
  }

  let a: Number = Math.min(min, max);
  let b: Number = Math.max(min, max);

  if (Math.abs(a - b) === 1) {
    let result: String = min + '|' + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }

  let isPadded: Boolean = hasPadding(min) || hasPadding(max);
  let state: Object = { min, max, a, b };
  let positives: Array = [];
  let negatives: Array = [];

  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }

  if (a < 0) {
    let newMin: Number = b < 0 ? Math.abs(b) : 1;
    negatives = splitToPatterns(newMin, Math.abs(a), state, opts);
    a = state.a = 0;
  }

  if (b >= 0) {
    positives = splitToPatterns(a, b, state, opts);
  }

  state.negatives = negatives;
  state.positives = positives;
  state.result = collatePatterns(negatives, positives, opts);

  if (opts.capture === true) {
    state.result = `(${state.result})`;
  } else if (opts.wrap !== false && (positives.length + negatives.length) > 1) {
    state.result = `(?:${state.result})`;
  }

  toRegexRange.cache[cacheKey] = state;
  return state.result;
};

function collatePatterns(neg: String, pos: String, options: Object): String {
  let onlyNegative: Array = filterPatterns(neg, pos, '-', false, options) || [];
  let onlyPositive: Array = filterPatterns(pos, neg, '', false, options) || [];
  let intersected: Array = filterPatterns(neg, pos, '-?', true, options) || [];
  let subpatterns: Array = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join('|');
}

function splitToRanges(min: Number, max: Number): Map {
  let nines: Number = 1;
  let zeros: Number = 1;

  let stop: Number = countNines(min, nines);
  let stops: Map = new Set([max]);

  while (min <= stop && stop <= max) {
    stops.add(stop);
    nines += 1;
    stop = countNines(min, nines);
  }

  stop = countZeros(max + 1, zeros) - 1;

  while (min < stop && stop <= max) {
    stops.add(stop);
    zeros += 1;
    stop = countZeros(max + 1, zeros) - 1;
  }

  stops = [...stops];
  stops.sort(compare);
  return stops;
}

/**
 * Convert a range to a regex pattern
 * @param {Number} `start`
 * @param {Number} `stop`
 * @return {String}
 */

function rangeToPattern(start: Number, stop: String, options: Object): Object {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }

  let zipped: Array = zip(start, stop);
  let digits: Number = zipped.length;
  let pattern: String = '';
  let count: Number = 0;

  for (let i = 0; i < digits; i++) {
    let [startDigit, stopDigit] = zipped[i];

    if (startDigit === stopDigit) {
      pattern += startDigit;

    } else if (startDigit !== '0' || stopDigit !== '9') {
      pattern += toCharacterClass(startDigit, stopDigit, options);

    } else {
      count++;
    }
  }

  if (count) {
    pattern += options.shorthand === true ? '\\d' : '[0-9]';
  }

  return { pattern, count: [count], digits };
}

function splitToPatterns(min: String, max: String, tok: String, options: Object): Array {
  let ranges: Array = splitToRanges(min, max);
  let tokens: Array = [];
  let start: String = min;
  let prev: Object;

  for (let i = 0; i < ranges.length; i++) {
    let max: String = ranges[i];
    let obj: Object = rangeToPattern(String(start), String(max), options);
    let zeros: String = '';

    if (!tok.isPadded && prev && prev.pattern === obj.pattern) {
      if (prev.count.length > 1) {
        prev.count.pop();
      }

      prev.count.push(obj.count[0]);
      prev.string = prev.pattern + toQuantifier(prev.count);
      start = max + 1;
      continue;
    }

    if (tok.isPadded) {
      zeros = padZeros(max, tok, options);
    }

    obj.string = zeros + obj.pattern + toQuantifier(obj.count);
    tokens.push(obj);
    start = max + 1;
    prev = obj;
  }

  return tokens;
}

function filterPatterns(arr: Array, comparison: String, prefix: String, intersection: Number, options: Object): Array {
  let result: Array = [];

  for (let ele of arr) {
    let { string } = ele;

    // only push if _both_ are negative...
    if (!intersection && !contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }

    // or _both_ are positive
    if (intersection && contains(comparison, 'string', string)) {
      result.push(prefix + string);
    }
  }
  return result;
}

/**
 * Zip strings
 */

function zip(a: Array, b: Object): Array {
  let arr: Array = [];
  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
  return arr;
}

function compare(a: Number, b: Number): Number {
  return a > b ? 1 : b > a ? -1 : 0;
}

function contains(arr: Array, key: String, val: Number): Boolean {
  return arr.some((ele: Object) => ele[key] === val);
}

function countNines(min: String, len: Number): Number {
  return Number(String(min).slice(0, -len) + '9'.repeat(len));
}

function countZeros(integer: Number, zeros: Number): Number {
  return integer - (integer % Math.pow(10, zeros));
}

function toQuantifier(digits: Array): String {
  let [start = 0, stop = ''] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? ',' + stop : '')}}`;
  }
  return '';
}

function toCharacterClass(a: Number, b: Number, options: Object): String {
  return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
}

function hasPadding(str: String): Boolean {
  return /^-?(0+)\d/.test(str);
}

function padZeros(value: String, tok: HTMLElement, options: Element): String {
  if (!tok.isPadded) {
    return value;
  }

  let diff: Number = Math.abs(tok.maxLen - String(value).length);
  let relax: Boolean = options.relaxZeros !== false;

  switch (diff) {
    case 0:
      return '';
    case 1:
      return relax ? '0?' : '0';
    case 2:
      return relax ? '0{0,2}' : '00';
    default: {
      return relax ? `0{0,${diff}}` : `0{${diff}}`;
    }
  }
}

/**
 * Cache
 */

toRegexRange.cache = {};
toRegexRange.clearCache = () => (toRegexRange.cache = {});

/**
 * Expose `toRegexRange`
 */

export default toRegexRange;
