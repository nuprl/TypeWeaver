'use strict';

export default function repeat(val, num) {
  var arr = [];

  while (num--) {
    arr[num] = val;
  }

  return arr;
};
