'use strict';

module.exports = function repeat(ele: string, num: string): string {
  var res: any[] = [ele];

  while (res.length < num) {
    res = res.concat(res);
  }

  return res.slice(0, num);
};
