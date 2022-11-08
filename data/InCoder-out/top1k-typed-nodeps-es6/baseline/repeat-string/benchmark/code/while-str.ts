'use strict';

export default function repeat(val: number,  amount: number) {
  var str = '';
  while (amount--) {
    str += val;
  }
  return str;
};