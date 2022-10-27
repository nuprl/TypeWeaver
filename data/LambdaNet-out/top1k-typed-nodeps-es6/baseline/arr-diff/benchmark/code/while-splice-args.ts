'use strict';

export default function(arr: String, arrays: Function) {
  for (var i = 1; i < arguments.length; i++) {
    diff(arr, arguments[i]);
  }
  return arr;
};

function diff(one: String, two: Array): Void {
  if (!Array.isArray(two)) return;
  var len: Number = two.length;
  var idx: Number = -1;
  while (++idx < len) {
    remove(one, two[idx]);
  }
}

function remove(arr: Array, ele: String): String {
  var idx: Number = arr.indexOf(ele);
  if (idx === -1) return;
  var item: String = arr.pop();
  if (item !== ele) {
    arr[idx] = item;
  }
  return remove(arr, ele);
}
