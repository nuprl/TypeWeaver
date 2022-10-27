'use strict';

export default function(val: number, num): any {
  return repeat(val, num, []);
};

function repeat(val: number, num: number, arr: any): string {
  while (num--) {
    arr[num] = val;
  }
  return arr;
}
