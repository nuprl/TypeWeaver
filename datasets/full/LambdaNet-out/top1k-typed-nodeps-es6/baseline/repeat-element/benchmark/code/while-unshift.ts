'use strict';

export default function repeat(val: string, amount: number): any[] {
  var res: any[] = [];

  while (amount--) {
    res.unshift(val);
  }

  return res;
};
