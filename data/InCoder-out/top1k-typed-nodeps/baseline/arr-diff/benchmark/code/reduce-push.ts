'use strict';

module.exports = function diff(arr: number[][],  arrays: number[][]) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc: any,  ele: any,  i: number) {
    if (arrays.indexOf(ele) === -1) {
      acc.push(ele);
    }
    return acc;
  }, []);
};