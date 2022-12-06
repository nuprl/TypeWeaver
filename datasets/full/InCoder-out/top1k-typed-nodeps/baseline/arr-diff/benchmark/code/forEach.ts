'use strict';

module.exports = function diff(arr: number[][],  arrays: number[][]) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var result = [];

  arr.forEach(function(key: any) {
    if (arrays.indexOf(key) === -1) {
      result.push(key);
    }
  });

  return result;
};