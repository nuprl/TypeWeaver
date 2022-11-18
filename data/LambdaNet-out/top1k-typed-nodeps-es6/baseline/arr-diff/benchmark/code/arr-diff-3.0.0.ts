'use strict';

import flatten from 'arr-flatten';
var slice: Function = [].slice;

export default function(arr: string, arrays: any[]) {
  arrays = flatten(slice.call(arguments, 1));
  var len: number = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: string, ele: string): Void {
  var idx: number = arr.indexOf(ele);
  while (idx !== -1) {
    arr.splice(idx, 1);
    idx = arr.indexOf(ele);
  }
}
