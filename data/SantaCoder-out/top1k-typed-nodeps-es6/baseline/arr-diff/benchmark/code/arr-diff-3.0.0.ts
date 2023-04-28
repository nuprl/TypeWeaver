'use strict';

import flatten from 'arr-flatten';
var slice = [].slice;

export default function(arr: any[], arrays: any[][]) {
  arrays = flatten(slice.call(arguments, 1));
  var len = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: any[], ele: any) {
  var idx = arr.indexOf(ele);
  while (idx !== -1) {
    arr.splice(idx, 1);
    idx = arr.indexOf(ele);
  }
}