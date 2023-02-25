'use strict';

export default function repeat(ele: any, num: number) {
  var arr = [];

  for (var i = 0; i < num; i++) {
    arr = arr.concat(ele);
  }

  return arr;
};