'use strict';

module.exports = function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var result: Array = [];

  arr.forEach(function(key: String) {
    if (arrays.indexOf(key) === -1) {
      result.push(key);
    }
  });

  return result;
};
