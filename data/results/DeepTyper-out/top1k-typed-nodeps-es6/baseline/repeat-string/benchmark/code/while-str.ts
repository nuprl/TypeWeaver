'use strict';

export default function repeat(val: number, amount: number): string {
  var str: string = '';
  while (amount--) {
    str += val;
  }
  return str;
};