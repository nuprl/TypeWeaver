'use strict';

module.exports = function repeat(val: any, amount: number): string {
  for (var i = 0, res = new Array(amount); i < amount + 1;) {
    res[i++] = '';
  }
  return res.join(val);
};
