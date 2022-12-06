'use strict';

module.exports = function diff(arr: any[], arrays: string): any[] {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: number = arr.length;
  var idx: number = -1;
  var result: any[] = [];

  while (++idx < len) {
    var ele: string = arr[idx];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};
