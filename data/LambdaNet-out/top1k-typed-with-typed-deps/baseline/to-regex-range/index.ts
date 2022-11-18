/*!
 * to-regex-range <https://github.com/micromatch/to-regex-range>
 *
 * Copyright (c) 2015-present, Jon Schlinkert.
 * Released under the MIT License.
 */

'use strict';

const isNumber: Function = require('is-number');

const toRegexRange: Function = (min: number, max: number, options: object) => {
  if (isNumber(min) === false) {
    throw new TypeError('toRegexRange: expected the first argument to be a number');
  }

  if (max === void 0 || min === max) {
    return String(min);
  }

  if (isNumber(max) === false) {
    throw new TypeError('toRegexRange: expected the second argument to be a number.');
  }

  let opts: object = { relaxZeros: true, ...options };
  if (typeof opts.strictZeros === 'boolean') {
    opts.relaxZeros = opts.strictZeros === false;
  }

  let relax: string = String(opts.relaxZeros);
  let shorthand: string = String(opts.shorthand);
  let capture: string = String(opts.capture);
  let wrap: string = String(opts.wrap);
  let cacheKey: string = min + ':' + max + '=' + relax + shorthand + capture + wrap;

  if (toRegexRange.cache.hasOwnProperty(cacheKey)) {
    return toRegexRange.cache[cacheKey].result;
  }

  let a: number = Math.min(min, max);
  let b: number = Math.max(min, max);

  if (Math.abs(a - b) === 1) {
    let result: string = min + '|' + max;
    if (opts.capture) {
      return `(${result})`;
    }
    if (opts.wrap === false) {
      return result;
    }
    return `(?:${result})`;
  }

  let isPadded: boolean = hasPadding(min) || hasPadding(max);
  let state: object = { min, max, a, b };
  let positives: any[] = [];
  let negatives: any[] = [];

  if (isPadded) {
    state.isPadded = isPadded;
    state.maxLen = String(state.max).length;
  }

  if (a < 0) {
    let newMin: number = b < 0 ? Math.abs(b) : 1;
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

function collatePatterns(neg: string, pos: string, options: object): string {
  let onlyNegative: any[] = filterPatterns(neg, pos, '-', false, options) || [];
  let onlyPositive: any[] = filterPatterns(pos, neg, '', false, options) || [];
  let intersected: any[] = filterPatterns(neg, pos, '-?', true, options) || [];
  let subpatterns: any[] = onlyNegative.concat(intersected).concat(onlyPositive);
  return subpatterns.join('|');
}

function splitToRanges(min: number, max: number): Map {
  let nines: number = 1;
  let zeros: number = 1;

  let stop: number = countNines(min, nines);
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

function rangeToPattern(start: number, stop: string, options: object): object {
  if (start === stop) {
    return { pattern: start, count: [], digits: 0 };
  }

  let zipped: any[] = zip(start, stop);
  let digits: number = zipped.length;
  let pattern: string = '';
  let count: number = 0;

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

function splitToPatterns(min: string, max: string, tok: string, options: object): any[] {
  let ranges: any[] = splitToRanges(min, max);
  let tokens: any[] = [];
  let start: string = min;
  let prev: object;

  for (let i = 0; i < ranges.length; i++) {
    let max: string = ranges[i];
    let obj: object = rangeToPattern(String(start), String(max), options);
    let zeros: string = '';

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

function filterPatterns(arr: any[], comparison: string, prefix: string, intersection: number, options: object): any[] {
  let result: any[] = [];

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

function zip(a: any[], b: object): any[] {
  let arr: any[] = [];
  for (let i = 0; i < a.length; i++) arr.push([a[i], b[i]]);
  return arr;
}

function compare(a: number, b: number): number {
  return a > b ? 1 : b > a ? -1 : 0;
}

function contains(arr: any[], key: string, val: number): boolean {
  return arr.some((ele: object) => ele[key] === val);
}

function countNines(min: string, len: number): number {
  return Number(String(min).slice(0, -len) + '9'.repeat(len));
}

function countZeros(integer: number, zeros: number): number {
  return integer - (integer % Math.pow(10, zeros));
}

function toQuantifier(digits: any[]): string {
  let [start = 0, stop = ''] = digits;
  if (stop || start > 1) {
    return `{${start + (stop ? ',' + stop : '')}}`;
  }
  return '';
}

function toCharacterClass(a: number, b: number, options: object): string {
  return `[${a}${(b - a === 1) ? '' : '-'}${b}]`;
}

function hasPadding(str: string): boolean {
  return /^-?(0+)\d/.test(str);
}

function padZeros(value: string, tok: HTMLElement, options: Element): string {
  if (!tok.isPadded) {
    return value;
  }

  let diff: number = Math.abs(tok.maxLen - String(value).length);
  let relax: boolean = options.relaxZeros !== false;

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

module.exports = toRegexRange;
