'use strict';

module.exports = function repeat(val: String, num: Number): String {
  var arr: Array = [];
  var i: Number = 0;

  while (num--) {
    arr[i++] = val;
  }
  return arr.join('');
};