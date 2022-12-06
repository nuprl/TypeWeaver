'use strict';

module.exports = function repeat(ele: Function, num: number): any[] {
  var arr: Promise = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};
