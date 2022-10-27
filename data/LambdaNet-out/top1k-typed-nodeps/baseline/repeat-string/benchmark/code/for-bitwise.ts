'use strict';

module.exports = repeat;

function repeat(str: String, num: Number): String {
  var res: String = '';

  for (;;) {
    if (num & 1) {
      res += str;
    }
    num >>>= 1;
    if (!num) return res;
    str += str;
  }
  return res;
}