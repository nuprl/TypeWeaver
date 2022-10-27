'use strict';

var res: String = '';
var cache: Number;

module.exports = function repeat(str: String, count: Number): String {
  var max: Number = (str.length * count);
  var i: Number = 0;

  cache = cache || str;
  if (cache !== str) {
    res = '';
    cache = str;
  }

  if (res.length >= max) {
    return res.slice(0, max);
  }

  for (; i < count; i++) {
    res += str;
    if (res.length >= max) {
      return res.slice(0, max);
    }
  }

  return res.slice(0, max);
};

