'use strict';

export default function diff(arr: any[], arrays: any[][]) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  arrays.forEach(function(value: T) {
    var idx = arr.indexOf(value);
    while (idx !== -1) {
      arr.splice(idx, 1);
      idx = arr.indexOf(value);
    }
  });

  return arr;
};