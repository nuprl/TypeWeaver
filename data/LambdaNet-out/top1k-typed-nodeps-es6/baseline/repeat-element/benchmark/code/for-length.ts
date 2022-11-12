'use strict';

export default repeat;

function repeat(ele: Function, num: Number): Array {
  if (num === 0) return [];

  var res: Array = [ele];
  var len: Number = res.length;

  if (len < num) {
    for (var i = num - 1 - len; i >= 0; i--) {
      res[i + len] = res[i % len];
    }
  }
  return res;
}
