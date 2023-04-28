'use strict';

export default function repeat(val: any, num: number) {
  var arr = [];

  while (num--) {
    arr[num] = val;
  }

  return arr;
};