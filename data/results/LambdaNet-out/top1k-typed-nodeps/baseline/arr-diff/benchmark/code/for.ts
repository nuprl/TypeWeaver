'use strict';

module.exports = function diff(arr: any[], arrays: string): any[] {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: number = arr.length;
  var result: any[] = [];

  for (var i = 0; i < len; i++) {
    var ele: string = arr[i];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};
