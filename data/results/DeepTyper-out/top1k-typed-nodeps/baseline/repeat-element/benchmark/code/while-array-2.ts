'use strict';

module.exports = function repeat(val: any, num: number): any {
  var arr: any[] = [];
  var i: number = 0;

  while (num--) {
    arr[i++] = val;
  }

  return arr;
};
