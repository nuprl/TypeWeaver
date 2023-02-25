'use strict';

export default function diff(arr: any[], arrays: any[]) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc: number, ele: number, i: number) {
    if (arrays.indexOf(ele) === -1) {
      return acc.concat(ele);
    }
    return acc;
  }, []);
};