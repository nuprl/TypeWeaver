'use strict';

module.exports = function diff(a: any[], b: any[], c: boolean): any[] {
  var len: number = a.length;
  var rest: any[] = [];
  var arr: any[] = [];

  if (!b) {
    return a;
  }

  if (!c) {
    rest = b;
  } else {
    rest = [].concat.apply([], [].slice.call(arguments, 1));
  }

  while (len--) {
    var ele: string = a[len];
    if (rest.indexOf(ele) === -1) {
      arr.push(ele);
    }
  }
  return arr;
};
