'use strict';

export default function(val: string, num: string) {
  return repeat(val, num, []);
};

function repeat(val: string, num: number, arr: object): object {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}
