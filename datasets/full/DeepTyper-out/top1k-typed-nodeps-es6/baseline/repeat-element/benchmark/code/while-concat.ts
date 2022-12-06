'use strict';

export default function repeat(ele: any, num: number): boolean {
  var res: any[] = [];

  while (num--) {
    res = res.concat(ele);
  }

  return res;
};
