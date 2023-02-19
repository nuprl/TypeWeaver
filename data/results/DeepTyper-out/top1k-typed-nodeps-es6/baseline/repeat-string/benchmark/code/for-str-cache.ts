'use strict';

var res: string = '';
var cache: any;

export default function repeat(str: string, count: number): string {
  var max: number = (str.length * count);
  var i: number = 0;

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

