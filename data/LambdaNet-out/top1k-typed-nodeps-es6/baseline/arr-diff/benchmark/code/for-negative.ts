'use strict';

export default function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: Number = arr.length - 1;
  var result: Array = [];

  for (var i = len; i >= 0; i--) {
    var ele: String = arr[i];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};
