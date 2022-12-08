'use strict';

export default function repeat(str: string, count: number): string {
  var res: string = '';

  while (count > 0) {
    if (count & 1) {
      res += str;
    }
    count >>= 1;
    str += str;
  }

  return res;
};
