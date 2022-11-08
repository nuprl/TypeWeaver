'use strict';

export default function diff(arr: Array,  arrays: Array) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  var len = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: Array<any>,  ele: any) {
  var idx = arr.indexOf(ele);
  while (idx !== -1) {
    var val = arr.pop();
    if (ele !== val) {
      arr[idx] = val;
    }
    idx = arr.indexOf(ele);
  }
}