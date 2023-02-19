'use strict';

module.exports = function repeat(val: string, num: number): string {
  var arr: any[] = [];
  while (num--) {
    arr[num] = val;
  }
  return arr.join('');
};