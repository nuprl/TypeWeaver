'use strict';

module.exports = function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc: Array, ele: String, i: String) {
    if (arrays.indexOf(ele) === -1) {
      acc.push(ele);
    }
    return acc;
  }, []);
};
