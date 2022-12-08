'use strict';

export default function repeat(val, amount) {
  var res = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};
