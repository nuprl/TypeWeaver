'use strict';

export default function(arr: number[],  arrays: number[][]) {
  for (var i = 1; i < arguments.length; i++) {
    diff(arr, arguments[i]);
  }
  return arr;
};

function diff(one: any,  two: any) {
  if (!Array.isArray(two)) return;
  var len = two.length;
  var idx = -1;
  while (++idx < len) {
    remove(one, two[idx]);
  }
}

function remove(arr: Array<any>,  ele: any) {
  var idx = arr.indexOf(ele);
  if (idx === -1) return;
  var item = arr.pop();
  if (item !== ele) {
    arr[idx] = item;
  }
  return remove(arr, ele);
}