'use strict';

module.exports = function diff(a: any[], b: any[], c: any[]) {
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