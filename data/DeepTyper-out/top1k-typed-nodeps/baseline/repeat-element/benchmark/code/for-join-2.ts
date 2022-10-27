'use strict';

module.exports = function repeat(ele: any, num: number): any {
  var arr: any[] = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};
