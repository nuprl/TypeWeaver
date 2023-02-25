'use strict';

import unique from 'array-unique';

export default function union(init/*: any[], arrays*/: any[]) {
  var arrays = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: number, arr: number[]) {
    return acc.concat(arr);
  }, init));
};