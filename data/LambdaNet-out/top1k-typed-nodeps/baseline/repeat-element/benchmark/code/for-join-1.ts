'use strict';

module.exports = function repeat(ele: Number, num: Number): Array {
  var arr: Promise = [];

  for (; 0 < num; num -= 1, arr[num] = ele);
  num++;

  return arr;
};
