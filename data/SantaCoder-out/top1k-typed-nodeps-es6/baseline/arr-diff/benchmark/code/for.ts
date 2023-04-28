'use strict';

export default function diff(arr: Array, arrays: Array) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len = arr.length;
  var result = [];

  for (var i = 0; i < len; i++) {
    var ele = arr[i];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};