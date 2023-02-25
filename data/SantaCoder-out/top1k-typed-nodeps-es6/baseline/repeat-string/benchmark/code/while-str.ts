'use strict';

export default function repeat(val: string, amount: number) {
  var str = '';
  while (amount--) {
    str += val;
  }
  return str;
};