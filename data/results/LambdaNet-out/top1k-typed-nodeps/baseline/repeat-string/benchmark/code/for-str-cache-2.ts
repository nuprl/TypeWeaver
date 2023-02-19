'use strict';

module.exports = repeat;

var res: string = '';
var cache: number;

function repeat(str: string, num: number): string {
  cache = cache || str;
  if (cache !== str) {
    res = '';
    cache = str;
  }

  var max: number = (str.length * num);
  var i: number = 0;

  if (res.length >= max) {
    return res.slice(0, max);
  }

  for (; num > 0; i++) {
    if (num & 1) {
      res += str;
    }

    if (res.length >= max) {
      return res.slice(0, max);
    }

    num >>= 1;
    str += str;
  }

  return res.slice(0, max);
}
