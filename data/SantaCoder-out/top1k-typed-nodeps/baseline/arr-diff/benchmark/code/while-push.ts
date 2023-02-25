'use strict';

module.exports = function diff(arr: Array<any>, arrays: Array<Array<any>>) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var len = arr.length;
  var result = [];

  while (len--) {
    var ele = arr[len];
    if (arrays.indexOf(ele) === -1) {
      result.push(ele);
    }
  }
  return result;
};