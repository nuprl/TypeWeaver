'use strict';

export default function repeat(ele: string, num: number): any[] {
  var arr: any[] = [];

  while (num--) {
    arr.push(ele);
  }

  return arr;
};
