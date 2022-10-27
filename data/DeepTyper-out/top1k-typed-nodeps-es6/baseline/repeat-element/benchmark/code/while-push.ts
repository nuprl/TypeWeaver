'use strict';

export default function repeat(ele: any, num: number): boolean {
  var arr: any[] = [];

  while (num--) {
    arr.push(ele);
  }

  return arr;
};
