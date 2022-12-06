'use strict';

export default function(val: string, num: string) {
  return repeat(val, num, []).join('');
};

function repeat(val: string, num: number, arr: object): object {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}