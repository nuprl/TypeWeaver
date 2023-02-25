'use strict';

export default function repeat(str: string, count: number) {
  var res = '';

  while (count > 0) {
    if (count & 1) {
      res += str;
    }
    count >>= 1;
    str += str;
  }

  return res;
};