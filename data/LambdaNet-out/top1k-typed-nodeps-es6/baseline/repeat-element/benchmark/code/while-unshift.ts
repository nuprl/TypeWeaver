'use strict';

export default function repeat(val: String, amount: Number): Array {
  var res: Array = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};
