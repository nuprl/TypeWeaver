'use strict';

module.exports = function diff(arr: any[], arrays: string): any[] {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: number = arr.length - 1;
  var result: any[] = [];

  for (var i = len; i >= 0; i--) {
    var ele: string = arr[i];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};
