'use strict';

export default function repeat(str: string, num: number) {
  var arr = [];
  arr[num] = '';
  return arr.join(str);
};