'use strict';

module.exports = function repeat(ele: string, num: number): string {
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
