'use strict';

module.exports = function repeat(val: Number, amount: Number): String {
  var res: String = '';
  for (var i = 0; i < amount; i++) {
    res += val;
  }
  return res;
};
