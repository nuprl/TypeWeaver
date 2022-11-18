'use strict';

module.exports = function repeat(ele: any[], num: number): any[] {
  var res: any[] = [];

  while (num--) {
    res = res.concat(ele);
  }

  return res;
};
