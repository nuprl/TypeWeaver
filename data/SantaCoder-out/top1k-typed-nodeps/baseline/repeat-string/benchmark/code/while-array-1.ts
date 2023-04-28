'use strict';

module.exports = function repeat(val: string, num: number) {
  var arr = [];
  while (num--) {
    arr[num] = val;
  }
  return arr.join('');
};