'use strict';

module.exports = function repeat(ele: Function, num: Number): Array {
  var arr: Array = [];

  for (var i = 0; i < num; i++) {
    arr = arr.concat(ele);
  }

  return arr;
};
