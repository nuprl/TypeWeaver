'use strict';

export default function repeat(ele, num) {
  var arr = [];

  for (; 0 < num; num -= 1, arr[num] = ele);
  num++;

  return arr;
};
