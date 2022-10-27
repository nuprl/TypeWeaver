'use strict';

module.exports = diff;

function diff(arr: String/*, arrays*/): String {
  var len: Number = arguments.length;
  var idx: Number = 0;
  while (++idx < len) {
    arr = diffArray(arr, arguments[idx]);
  }
  return arr;
}

function diffArray(one: Array, two: String): Array {
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var len: Number = one.length;
  var idx: Number = -1;
  var arr: Array = [];

  while (++idx < len) {
    var ele: String = one[idx];
    if (two.indexOf(ele) === -1) {
      arr.push(ele);
    }
  }
  return arr;
}
