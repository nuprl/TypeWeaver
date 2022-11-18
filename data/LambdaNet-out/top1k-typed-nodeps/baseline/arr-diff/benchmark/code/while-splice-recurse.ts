'use strict';

module.exports = function diff(arr: string, arrays: any[]): string {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  var len: number = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: any[], ele: string): string {
  var idx: number = arr.indexOf(ele);
  if (idx === -1) {
    return;
  }
  var val: string = arr.pop();
  if (val === ele) {
    return;
  }
  arr[idx] = val;
  return remove(arr, ele);
}
