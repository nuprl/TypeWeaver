'use strict';

export default function repeat(str, num) {
  var arr = [];
  arr[num] = '';
  return arr.join(str);
};