'use strict';

export default function repeat(ele: string, num: number) {
  var arr = [];

  for (var i = num; i > 0; i--) {
    arr.push(ele);
  }

  return arr;
};