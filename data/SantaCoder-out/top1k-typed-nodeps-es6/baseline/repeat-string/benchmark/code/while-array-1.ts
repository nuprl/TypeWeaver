'use strict';

export default function repeat(val: string, num: number) {
  var arr = [];
  while (num--) {
    arr[num] = val;
  }
  return arr.join('');
};