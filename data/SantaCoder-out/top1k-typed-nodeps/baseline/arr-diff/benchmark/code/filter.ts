'use strict';

module.exports = function diff(arr: any[], arrays: any[]) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  return arr.filter(function(ele: any) {
    return arrays.indexOf(ele) === -1;
  });
};