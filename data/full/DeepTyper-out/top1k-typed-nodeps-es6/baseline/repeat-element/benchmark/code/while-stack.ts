'use strict';

export default function repeat(ele: any, num: number): boolean {
  var res: any[] = [ele];
  var max: number = num;

  while (num--) {
    res.push.apply(res, res);
    if (res.length >= max) {
      break;
    }
  }

  return res.slice(0, max);
};
