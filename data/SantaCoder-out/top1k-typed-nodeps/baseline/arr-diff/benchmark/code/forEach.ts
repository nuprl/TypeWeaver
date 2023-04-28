'use strict';

module.exports = function diff(arr: Array<any>, arrays: Array<any>) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var result = [];

  arr.forEach(function(key: string) {
    if (arrays.indexOf(key) === -1) {
      result.push(key);
    }
  });

  return result;
};