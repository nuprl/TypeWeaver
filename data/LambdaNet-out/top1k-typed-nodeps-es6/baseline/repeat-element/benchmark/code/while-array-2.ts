'use strict';

export default function repeat(val: String, num: Number): Object {
  var arr: Promise = [];
  var i: Number = 0;

  while (num--) {
    arr[i++] = val;
  }

  return arr;
};
