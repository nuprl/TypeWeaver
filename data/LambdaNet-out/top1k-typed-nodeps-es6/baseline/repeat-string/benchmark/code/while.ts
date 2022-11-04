'use strict';

export default function repeat(str: String, count: Number): String {
  var res: String = '';

  while (count > 0) {
    if (count & 1) {
      res += str;
    }
    count >>= 1;
    str += str;
  }

  return res;
};