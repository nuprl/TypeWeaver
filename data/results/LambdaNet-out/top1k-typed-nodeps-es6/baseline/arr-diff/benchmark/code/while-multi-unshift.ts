'use strict';

export default function diff(a: any[], b: any[], c: boolean): any[] {
  var len: number = a.length;
  var arr: any[] = [];
  var rest: any[];

  if (!b) {
    return a;
  }

  if (!c) {
    rest = b;
  } else {
    rest = [].concat.apply([], [].slice.call(arguments, 1));
  }

  while (len--) {
    var ele: string = arr[len];
    if (rest.indexOf(ele) === -1) {
      arr.unshift(ele);
    }
  }
  return arr;
};
