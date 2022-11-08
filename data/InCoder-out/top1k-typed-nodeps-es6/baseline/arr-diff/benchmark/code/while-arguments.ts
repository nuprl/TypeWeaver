'use strict';

export default diff;

function diff(arr/*: Array<T>,  arrays*/: Array<T>[]) {
  var len = arguments.length;
  var idx = 0;
  while (++idx < len) {
    arr = diffArray(arr, arguments[idx]);
  }
  return arr;
}

function diffArray(one: Array,  two: Array) {
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var len = one.length;
  var idx = -1;
  var arr = [];

  while (++idx < len) {
    var ele = one[idx];
    if (two.indexOf(ele) === -1) {
      arr.push(ele);
    }
  }
  return arr;
}