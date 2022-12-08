'use strict';

module.exports = function repeat(val: number, amount: number): string {
  var str: string = '';
  while (amount--) {
    str += val;
  }
  return str;
};