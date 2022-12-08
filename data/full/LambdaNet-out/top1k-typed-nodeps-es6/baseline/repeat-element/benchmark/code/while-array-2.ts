'use strict';

export default function repeat(val: string, num: number): object {
  var arr: Promise = [];
  var i: number = 0;

  while (num--) {
    arr[i++] = val;
  }

  return arr;
};
