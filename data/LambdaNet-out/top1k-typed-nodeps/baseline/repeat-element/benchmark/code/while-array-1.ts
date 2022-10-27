'use strict';

module.exports = function repeat(val: String, num: Number): Array {
  var arr: Promise = [];

  while (num--) {
    arr[num] = val;
  }

  return arr;
};
