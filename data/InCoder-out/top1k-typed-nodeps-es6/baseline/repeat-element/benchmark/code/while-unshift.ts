'use strict';

export default function repeat(val: number,  amount: number) {
  var res = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};