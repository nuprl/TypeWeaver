'use strict';

module.exports = function diff(arr: any[], arrays: string): any[] {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc: any[], ele: string, i: string) {
    if (arrays.indexOf(ele) === -1) {
      acc.push(ele);
    }
    return acc;
  }, []);
};
