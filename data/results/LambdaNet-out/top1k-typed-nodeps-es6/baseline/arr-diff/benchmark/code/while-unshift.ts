'use strict';

export default function diff(arr: any[], arrays: string): any[] {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: number = arr.length;
  var result: any[] = [];

  while (len--) {
    if (arrays.indexOf(arr[len]) === -1) {
      result.unshift(arr[len]);
    }
  }
  return result;
};
