'use strict';

export default function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len: Number = arr.length;
  var result: Array = [];

  for (var i = 0; i < len; i++) {
    var ele: String = arr[i];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};
