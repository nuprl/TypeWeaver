'use strict';

module.exports = function repeat(val: number,  amount: number) {
  var res = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};