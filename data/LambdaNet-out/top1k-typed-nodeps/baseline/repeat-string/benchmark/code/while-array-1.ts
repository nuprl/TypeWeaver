'use strict';

module.exports = function repeat(val: String, num: Number): String {
  var arr: Array = [];
  while (num--) {
    arr[num] = val;
  }
  return arr.join('');
};