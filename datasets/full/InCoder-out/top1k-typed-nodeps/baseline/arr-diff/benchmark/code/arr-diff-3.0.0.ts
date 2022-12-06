'use strict';

var flatten = require('arr-flatten');
var slice = [].slice;

module.exports = function(arr: number[],  arrays: number[][]) {
  arrays = flatten(slice.call(arguments, 1));
  var len = arrays.length;
  for (var i = 0; i < len; i++) {
    remove(arr, arrays[i]);
  }
  return arr;
};

function remove(arr: Array<any>,  ele: any) {
  var idx = arr.indexOf(ele);
  while (idx !== -1) {
    arr.splice(idx, 1);
    idx = arr.indexOf(ele);
  }
}