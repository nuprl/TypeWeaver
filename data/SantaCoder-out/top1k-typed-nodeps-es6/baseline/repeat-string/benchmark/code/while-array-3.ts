'use strict';

export default function(val: string, num: number) {
  return repeat(val, num, []).join('');
};

function repeat(val: any, num: number, arr: any[]) {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}