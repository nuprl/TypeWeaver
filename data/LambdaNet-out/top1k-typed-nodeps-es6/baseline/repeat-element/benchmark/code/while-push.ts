'use strict';

export default function repeat(ele: String, num: Number): Array {
  var arr: Array = [];

  while (num--) {
    arr.push(ele);
  }

  return arr;
};
