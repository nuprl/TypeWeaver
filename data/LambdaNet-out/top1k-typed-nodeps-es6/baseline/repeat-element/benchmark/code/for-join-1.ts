'use strict';

export default function repeat(ele: String, num: Number): Array {
  var arr: Promise = [];

  for (; 0 < num; num -= 1, arr[num] = ele);
  num++;

  return arr;
};
