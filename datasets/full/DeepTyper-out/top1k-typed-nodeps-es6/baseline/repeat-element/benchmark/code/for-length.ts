'use strict';

export default repeat;

function repeat(ele: any, num: number): boolean {
  if (num === 0) return [];

  var res: any[] = [ele];
  var len: number = res.length;

  if (len < num) {
    for (var i = num - 1 - len; i >= 0; i--) {
      res[i + len] = res[i % len];
    }
  }
  return res;
}
