'use strict';

export default function repeat(ele: Function, num: String): Array {
  var arr: Array = [];

  for (var i = 0; i < num; i++) {
    arr = arr.concat(ele);
  }

  return arr;
};
