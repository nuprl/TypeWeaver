'use strict';

export default function repeat(ele: Function, num: number): any[] {
  var res: any[] = [];

  while (num--) {
    res = res.concat(ele);
  }

  return res;
};
