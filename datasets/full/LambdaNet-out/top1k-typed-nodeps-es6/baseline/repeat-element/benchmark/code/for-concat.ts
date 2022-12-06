'use strict';

export default function repeat(ele: Function, num: string): any[] {
  var arr: any[] = [];

  for (var i = 0; i < num; i++) {
    arr = arr.concat(ele);
  }

  return arr;
};
