'use strict';

module.exports = function repeat(ele: any, num: number): any {
  var arr: any[] = [];

  for (; 0 < num; num -= 1, arr[num] = ele);
  num++;

  return arr;
};
