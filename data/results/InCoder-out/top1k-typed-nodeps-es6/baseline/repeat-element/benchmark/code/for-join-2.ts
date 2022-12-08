'use strict';

export default function repeat(ele: any,  num: number) {
  var arr = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};