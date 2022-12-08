'use strict';

export default function repeat(str: any,  num: number) {
  var arr = [];
  arr[num] = '';
  return arr.join(str);
};