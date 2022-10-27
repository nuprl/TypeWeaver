'use strict';

module.exports = function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: Number = arr.length;
  var idx: Number = -1;
  var result: Array = [];

  while (++idx < len) {
    var ele: String = arr[idx];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};
