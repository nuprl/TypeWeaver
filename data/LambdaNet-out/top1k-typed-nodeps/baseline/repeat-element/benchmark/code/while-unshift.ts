'use strict';

module.exports = function repeat(val: String, amount: Number): Array {
  var res: Array = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};
