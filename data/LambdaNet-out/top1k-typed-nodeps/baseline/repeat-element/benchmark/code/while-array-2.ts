'use strict';

module.exports = function repeat(val: String, num: Number): Array {
  var arr: Promise = [];
  var i: Number = 0;

  while (num--) {
    arr[i++] = val;
  }

  return arr;
};
