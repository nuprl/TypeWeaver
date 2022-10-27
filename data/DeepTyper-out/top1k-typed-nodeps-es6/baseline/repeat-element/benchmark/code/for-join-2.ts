'use strict';

export default function repeat(ele: any, num: number): any[] {
  var arr: any[] = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};
