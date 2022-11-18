'use strict';

export default function repeat(val: string, amount: number): string {
  var str: string = '';
  while (amount--) {
    str += val;
  }
  return str;
};