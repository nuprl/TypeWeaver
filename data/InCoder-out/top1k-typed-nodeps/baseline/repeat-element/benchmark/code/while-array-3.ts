'use strict';

module.exports = function(val: number,  num: number) {
  return repeat(val, num, []);
};

function repeat(val: number,  num: number,  arr: Array<any>) {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}