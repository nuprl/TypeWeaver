'use strict';

export default function repeat(val: number, amount: number): string {
  var res: any[] = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};
