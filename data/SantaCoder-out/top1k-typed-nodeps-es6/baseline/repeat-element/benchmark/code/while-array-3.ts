'use strict';

export default function(val: any, num: number) {
  return repeat(val, num, []);
};

function repeat(val: any, num: number, arr: any[]) {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}