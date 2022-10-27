'use strict';

module.exports = function repeat(val: Number, amount: Number): String {
  var str: String = '';
  while (amount--) {
    str += val;
  }
  return str;
};