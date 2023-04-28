'use strict';

export default function diff(arr: any[], arrays: any[]) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  return arr.filter(function(ele: T) {
    return arrays.indexOf(ele) === -1;
  });
};