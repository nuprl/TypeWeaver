'use strict';

export default function repeat(val: string, num: number) {
  var arr = [];
  var i = 0;

  while (num--) {
    arr[i++] = val;
  }
  return arr.join('');
};