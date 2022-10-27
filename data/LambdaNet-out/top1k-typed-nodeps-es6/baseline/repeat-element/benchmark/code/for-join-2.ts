'use strict';

export default function repeat(ele: String, num: Number): Object {
  var arr: Promise = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};
