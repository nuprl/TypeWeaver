'use strict';

export default function repeat(val: any, num: number): string {
  num += 1;
  var arr: any;
  for (arr = []; 0 < num; num -= 1, arr[num] = '');
  return arr.join(val);
};
