'use strict';

module.exports = function repeat(val: any, num: number) {
  var arr = [];
  while (num--) {
    arr[num] = val;
  }
  return arr.join('');
};