'use strict';

export default function repeat(ele: String, num: Number): Array {
  var arr: Array = [];

  for (var i = num; i > 0; i--) {
    arr.push(ele);
  }

  return arr;
};
