'use strict';

module.exports = function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  return arr.filter(function(ele: String) {
    return arrays.indexOf(ele) === -1;
  });
};
