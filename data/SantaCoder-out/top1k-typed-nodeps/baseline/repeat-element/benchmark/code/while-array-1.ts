'use strict';

module.exports = function repeat(val: number, num: number) {
  var arr = [];

  while (num--) {
    arr[num] = val;
  }

  return arr;
};