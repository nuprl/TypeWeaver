'use strict';

export default function repeat(val: string, num: number): string {
  var arr: any[] = [];
  var i: number = 0;

  while (num--) {
    arr[i++] = val;
  }
  return arr.join('');
};