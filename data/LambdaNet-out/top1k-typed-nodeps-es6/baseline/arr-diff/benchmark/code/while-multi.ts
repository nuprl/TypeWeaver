'use strict';

export default function diff(a: Array, b: Array, c: Boolean): Array {
  var len: Number = a.length;
  var rest: Array = [];
  var arr: Array = [];

  if (!b) {
    return a;
  }

  if (!c) {
    rest = b;
  } else {
    rest = [].concat.apply([], [].slice.call(arguments, 1));
  }

  while (len--) {
    var ele: String = a[len];
    if (rest.indexOf(ele) === -1) {
      arr.push(ele);
    }
  }
  return arr;
};
