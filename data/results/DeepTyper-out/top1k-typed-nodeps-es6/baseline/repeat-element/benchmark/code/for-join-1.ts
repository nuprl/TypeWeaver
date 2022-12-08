'use strict';

export default function repeat(ele: any, num: number): boolean {
  var arr: any[] = [];

  for (; 0 < num; num -= 1, arr[num] = ele);
  num++;

  return arr;
};
