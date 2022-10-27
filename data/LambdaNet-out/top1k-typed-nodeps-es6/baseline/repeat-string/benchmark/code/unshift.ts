'use strict';

export default function repeat(val: String, amount: Number): String {
  var res: Array = [];

  while (amount--) {
    res.unshift(val);
  }

  return res.join('');
};
