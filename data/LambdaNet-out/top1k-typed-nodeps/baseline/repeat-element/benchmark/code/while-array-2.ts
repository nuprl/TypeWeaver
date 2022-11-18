'use strict';

module.exports = function repeat(val: string, num: number): any[] {
  var arr: Promise = [];
  var i: number = 0;

  while (num--) {
    arr[i++] = val;
  }

  return arr;
};
