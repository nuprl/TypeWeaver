'use strict';

module.exports = diff;

function diff(arr: string/*, arrays*/): string {
  var len: number = arguments.length;
  var idx: number = 0;
  while (++idx < len) {
    arr = diffArray(arr, arguments[idx]);
  }
  return arr;
}

function diffArray(one: any[], two: string): any[] {
  if (!Array.isArray(two)) {
    return one.slice();
  }

  var len: number = one.length;
  var idx: number = -1;
  var arr: any[] = [];

  while (++idx < len) {
    var ele: string = one[idx];
    if (two.indexOf(ele) === -1) {
      arr.push(ele);
    }
  }
  return arr;
}
