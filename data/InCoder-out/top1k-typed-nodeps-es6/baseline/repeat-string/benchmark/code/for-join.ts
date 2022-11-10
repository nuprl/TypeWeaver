'use strict';

export default function repeat(val: number,  num: number) {
  num += 1;
  var arr;
  for (arr = []; 0 < num; num -= 1, arr[num] = '');
  return arr.join(val);
};