'use strict';

module.exports = function repeat(ele: any,  num: number) {
  var arr = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};