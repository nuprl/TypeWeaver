'use strict';

module.exports = function(val: string, num: number) {
  return repeat(val, num, []);
};

function repeat(val: string, num: number, arr: object): object {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}
