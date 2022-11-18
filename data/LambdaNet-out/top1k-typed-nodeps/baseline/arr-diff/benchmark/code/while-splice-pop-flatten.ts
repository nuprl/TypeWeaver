'use strict';

var flatten: Function = require('arr-flatten');

module.exports = function diff(arr: string, arrays: any[]): string {
  arrays = flatten([].slice.call(arguments, 1));
  var len: number = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: any[], ele: string): Void {
  var idx: number = arr.indexOf(ele);
  while (idx !== -1) {
    var val: string = arr.pop();
    if (ele !== val) {
      arr[idx] = val;
    }
    idx = arr.indexOf(ele);
  }
}
