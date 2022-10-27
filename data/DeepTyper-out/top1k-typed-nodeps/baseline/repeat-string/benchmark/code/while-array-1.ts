'use strict';

module.exports = function repeat(val: any, num: number): any {
  var arr: any[] = [];
  while (num--) {
    arr[num] = val;
  }
  return arr.join('');
};