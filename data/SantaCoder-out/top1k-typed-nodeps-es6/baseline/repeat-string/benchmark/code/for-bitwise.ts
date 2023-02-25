'use strict';

export default repeat;

function repeat(str: string, num: number) {
  var res = '';

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