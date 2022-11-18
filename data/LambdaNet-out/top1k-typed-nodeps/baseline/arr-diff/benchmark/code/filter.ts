'use strict';

module.exports = function diff(arr: any[], arrays: string): any[] {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  return arr.filter(function(ele: string) {
    return arrays.indexOf(ele) === -1;
  });
};
