'use strict';

module.exports = function diff(arr: any[], arrays: string): any[] {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc: object, ele: string, i: string) {
    if (arrays.indexOf(ele) === -1) {
      return acc.concat(ele);
    }
    return acc;
  }, []);
};
