'use strict';

module.exports = function diff(arr: any[], arrays: string): any[] {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var result: any[] = [];

  arr.forEach(function(key: string) {
    if (arrays.indexOf(key) === -1) {
      result.push(key);
    }
  });

  return result;
};
