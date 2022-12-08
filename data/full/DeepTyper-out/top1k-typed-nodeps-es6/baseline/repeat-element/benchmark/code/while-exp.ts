'use strict';

export default function repeat(ele: any, num: number): boolean {
  var res: any[] = [ele];

  while (res.length < num) {
    res = res.concat(res);
  }

  return res.slice(0, num);
};
