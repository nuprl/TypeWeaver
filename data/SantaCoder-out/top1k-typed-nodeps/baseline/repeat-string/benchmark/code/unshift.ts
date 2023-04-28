'use strict';

module.exports = function repeat(val: string, amount: number) {
  var res = [];

  while (amount--) {
    res.unshift(val);
  }

  return res.join('');
};