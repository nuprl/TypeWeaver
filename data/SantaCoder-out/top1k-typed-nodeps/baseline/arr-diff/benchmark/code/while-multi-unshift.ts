'use strict';

module.exports = function diff(a: any, b: any, c: any) {
  var len = a.length;
  var arr = [];
  var rest;

  if (!b) {
    return a;
  }

  if (!c) {
    rest = b;
  } else {
    rest = [].concat.apply([], [].slice.call(arguments, 1));
  }

  while (len--) {
    var ele = arr[len];
    if (rest.indexOf(ele) === -1) {
      arr.unshift(ele);
    }
  }
  return arr;
};