'use strict';

var res: string = '';
var cache: number;

module.exports = function repeat(str: string, num: number): string {
  var max: number = str.length * num;

  cache = cache || str;
  if (cache !== str) {
    res = '';
    cache = str;
  }

  while (num > 0 && max > res.length) {
    if (num & 1) {
      res += str;
    }

    if (max <= res.length) {
      return res.substr(0, max);
    }

    num >>= 1;
    str += str;
  }

  return res.substr(0, max);
};
