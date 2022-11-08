'use strict';

export default function(val: number,  num: number) {
  return repeat(val, num, []).join('');
};

function repeat(val: number,  num: number,  arr: Array<any>) {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}