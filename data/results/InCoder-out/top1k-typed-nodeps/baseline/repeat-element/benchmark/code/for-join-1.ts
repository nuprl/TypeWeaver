'use strict';

module.exports = function repeat(ele: any,  num: number) {
  var arr = [];

  for (; 0 < num; num -= 1, arr[num] = ele);
  num++;

  return arr;
};