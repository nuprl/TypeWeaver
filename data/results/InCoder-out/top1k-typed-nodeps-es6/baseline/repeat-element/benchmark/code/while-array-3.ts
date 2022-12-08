'use strict';

export default function(val: any,  num: number) {
  return repeat(val, num, []);
};

function repeat(val: number,  num: number,  arr: number[]) {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}