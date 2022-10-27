'use strict';

export default repeat;

var res: String = '';
var cache: Number;

function repeat(str: String, num: Number): String {
  cache = cache || str;
  if (cache !== str) {
    res = '';
    cache = str;
  }

  var max: Number = (str.length * num);
  var i: Number = 0;

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
