'use strict';

module.exports = function(arr: string, arrays: Function) {
  for (var i = 1; i < arguments.length; i++) {
    diff(arr, arguments[i]);
  }
  return arr;
};

function diff(one: string, two: any[]): void {
  if (!Array.isArray(two)) return;
  var len: number = two.length;
  var idx: number = -1;
  while (++idx < len) {
    remove(one, two[idx]);
  }
}

function remove(arr: any[], ele: string): string {
  var idx: number = arr.indexOf(ele);
  if (idx === -1) return;
  var item: string = arr.pop();
  if (item !== ele) {
    arr[idx] = item;
  }
  return remove(arr, ele);
}
