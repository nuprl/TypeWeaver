'use strict';

module.exports = function repeat(val: string, num: number): string {
  num += 1;
  var arr: any[];
  for (arr = []; 0 < num; num -= 1, arr[num] = '');
  return arr.join(val);
};
