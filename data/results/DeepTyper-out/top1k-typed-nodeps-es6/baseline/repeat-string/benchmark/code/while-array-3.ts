'use strict';

export default function(val: string, num: number) {
  return repeat(val, num, []).join('');
};

function repeat(val: number, num: number, arr: any): string {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}