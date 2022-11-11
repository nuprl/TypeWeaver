'use strict';

export default function repeat(val: any,  amount: number) {
  var str = '';
  while (amount--) {
    str += val;
  }
  return str;
};