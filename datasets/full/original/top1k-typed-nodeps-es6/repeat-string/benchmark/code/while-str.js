'use strict';

export default function repeat(val, amount) {
  var str = '';
  while (amount--) {
    str += val;
  }
  return str;
};