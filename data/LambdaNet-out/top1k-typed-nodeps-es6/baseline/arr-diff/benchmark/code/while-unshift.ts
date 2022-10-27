'use strict';

export default function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: Number = arr.length;
  var result: Array = [];

  while (len--) {
    if (arrays.indexOf(arr[len]) === -1) {
      result.unshift(arr[len]);
    }
  }
  return result;
};
