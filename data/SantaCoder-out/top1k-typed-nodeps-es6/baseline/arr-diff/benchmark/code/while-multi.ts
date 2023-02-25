'use strict';

export default function diff(a: number, b: number, c: number) {
  var len = a.length;
  var rest = [];
  var arr = [];

  if (!b) {
    return a;
  }

  if (!c) {
    rest = b;
  } else {
    rest = [].concat.apply([], [].slice.call(arguments, 1));
  }

  while (len--) {
    var ele = a[len];
    if (rest.indexOf(ele) === -1) {
      arr.push(ele);
    }
  }
  return arr;
};