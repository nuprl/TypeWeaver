'use strict';

export default function repeat(val, num) {
  var arr = [];
  var i = 0;

  while (num--) {
    arr[i++] = val;
  }

  return arr;
};
