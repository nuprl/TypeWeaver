'use strict';

module.exports = function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: Number = arr.length;
  var result: Array = [];

  while (len--) {
    var ele: String = arr[len];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};
