'use strict';

import flatten from 'arr-flatten';
var slice: Function = [].slice;

export default function(arr: String, arrays: Array) {
  arrays = flatten(slice.call(arguments, 1));
  var len: Number = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: String, ele: String): Void {
  var idx: Number = arr.indexOf(ele);
  while (idx !== -1) {
    arr.splice(idx, 1);
    idx = arr.indexOf(ele);
  }
}
