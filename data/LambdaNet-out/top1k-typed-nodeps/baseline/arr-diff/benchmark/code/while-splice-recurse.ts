'use strict';

module.exports = function diff(arr: String, arrays: Array): String {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  var len: Number = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: Array, ele: String): String {
  var idx: Number = arr.indexOf(ele);
  if (idx === -1) {
    return;
  }
  var val: String = arr.pop();
  if (val === ele) {
    return;
  }
  arr[idx] = val;
  return remove(arr, ele);
}
