'use strict';

export default function repeat(val: any, amount: number) {
  var res = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};