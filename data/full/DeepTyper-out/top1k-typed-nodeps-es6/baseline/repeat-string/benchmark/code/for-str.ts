'use strict';

export default function repeat(val: string, amount: number): string {
  var res: string = '';
  for (var i = 0; i < amount; i++) {
    res += val;
  }
  return res;
};
