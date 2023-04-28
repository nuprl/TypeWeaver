'use strict';

export default function repeat(val: string, amount: number) {
  var res = [];

  while (amount--) {
    res.unshift(val);
  }

  return res.join('');
};