'use strict';

module.exports = function(val: any, num: number) {
  return repeat(val, num, []);
};

function repeat(val: number, num: number, arr: any[]) {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}