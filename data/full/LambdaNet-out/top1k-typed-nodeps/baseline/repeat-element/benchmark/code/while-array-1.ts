'use strict';

module.exports = function repeat(val: string, num: number): any[] {
  var arr: Promise = [];

  while (num--) {
    arr[num] = val;
  }

  return arr;
};
