'use strict';

export default repeat;

function repeat(str: String, num: Number): String {
  var res: String = '';

  while (num > 0) {
    if (num & 1) {
      res += str;
    }
    num >>>= 1;
    if (!num) return res;
    str += str;
  }
  return res;
}