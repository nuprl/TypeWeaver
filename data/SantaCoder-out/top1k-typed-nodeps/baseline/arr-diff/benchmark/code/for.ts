'use strict';

module.exports = function diff(arr: Array<any>, arrays: Array<any>) {
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