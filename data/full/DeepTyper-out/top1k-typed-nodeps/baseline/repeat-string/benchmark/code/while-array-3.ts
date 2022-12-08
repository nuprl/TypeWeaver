'use strict';

module.exports = function(val: string, num: number) {
  return repeat(val, num, []).join('');
};

function repeat(val: any, num: number, arr: any): string {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}