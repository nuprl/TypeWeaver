'use strict';

export default function diff(a: Array, b: Array, c: Boolean): Array {
  var len: Number = a.length;
  var arr: Array = [];
  var rest: Array;

  if (!b) {
    return a;
  }

  if (!c) {
    rest = b;
  } else {
    rest = [].concat.apply([], [].slice.call(arguments, 1));
  }

  while (len--) {
    var ele: String = arr[len];
    if (rest.indexOf(ele) === -1) {
      arr.unshift(ele);
    }
  }
  return arr;
};
