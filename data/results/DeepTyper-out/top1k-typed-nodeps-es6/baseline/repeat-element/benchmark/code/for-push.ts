'use strict';

export default function repeat(ele: any, num: number): boolean {
  var arr: any[] = [];

  for (var i = num; i > 0; i--) {
    arr.push(ele);
  }

  return arr;
};
