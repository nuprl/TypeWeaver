'use strict';

export default function repeat(val: String, amount: Number): String {
  for (var i = 0, res = new Array(amount); i < amount + 1;) {
    res[i++] = '';
  }
  return res.join(val);
};
