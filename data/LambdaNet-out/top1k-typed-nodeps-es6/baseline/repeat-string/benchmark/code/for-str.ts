'use strict';

export default function repeat(val: String, amount: String): String {
  var res: String = '';
  for (var i = 0; i < amount; i++) {
    res += val;
  }
  return res;
};
