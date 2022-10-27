'use strict';

module.exports = function diff(arr: String, arrays: Array): String {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  var len: Number = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: Array, ele: String): Void {
  var idx: Number = arr.indexOf(ele);
  while (idx !== -1) {
    var val: String = arr.pop();
    if (ele !== val) {
      arr[idx] = val;
    }
    idx = arr.indexOf(ele);
  }
}
