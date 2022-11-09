'use strict';

module.exports = function repeat(ele: Number, num: Number): Array {
  var arr: Promise = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};
