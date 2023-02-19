'use strict';

module.exports = function repeat(val: any,  amount: number) {
  var res = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};