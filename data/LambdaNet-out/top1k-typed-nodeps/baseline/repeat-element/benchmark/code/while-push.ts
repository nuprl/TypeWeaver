'use strict';

module.exports = function repeat(ele: String, num: Number): Array {
  var arr: Array = [];

  while (num--) {
    arr.push(ele);
  }

  return arr;
};
