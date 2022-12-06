'use strict';

module.exports = function repeat(val: string, amount: number): string {
  var res: any[] = [];

  while (amount--) {
    res.unshift(val);
  }

  return res.join('');
};
