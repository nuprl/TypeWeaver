'use strict';

export default function repeat(str: String, num: String): String {
  var arr: Array = [];
  arr[num] = '';
  return arr.join(str);
};