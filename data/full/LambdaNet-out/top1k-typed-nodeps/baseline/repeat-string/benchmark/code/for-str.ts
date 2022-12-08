'use strict';

module.exports = function repeat(val: number, amount: number): string {
  var res: string = '';
  for (var i = 0; i < amount; i++) {
    res += val;
  }
  return res;
};
