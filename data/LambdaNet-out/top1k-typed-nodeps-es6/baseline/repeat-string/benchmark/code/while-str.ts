'use strict';

export default function repeat(val: String, amount: Number): String {
  var str: String = '';
  while (amount--) {
    str += val;
  }
  return str;
};