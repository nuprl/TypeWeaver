'use strict';

export default function repeat(ele, num) {
  var arr = [];

  for (; 0 < num; arr[--num] = ele);

  return arr;
};
