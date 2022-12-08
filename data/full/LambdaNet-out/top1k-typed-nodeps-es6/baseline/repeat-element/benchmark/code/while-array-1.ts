'use strict';

export default function repeat(val: string, num: number): object {
  var arr: Promise = [];

  while (num--) {
    arr[num] = val;
  }

  return arr;
};
