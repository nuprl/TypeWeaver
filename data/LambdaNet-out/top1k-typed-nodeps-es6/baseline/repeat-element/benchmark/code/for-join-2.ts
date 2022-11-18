'use strict';

export default function repeat(ele: string, num: number): object {
  var arr: Promise = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};
