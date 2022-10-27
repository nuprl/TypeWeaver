'use strict';

export default function repeat(val: String, num: Number): Object {
  var arr: Promise = [];

  while (num--) {
    arr[num] = val;
  }

  return arr;
};
