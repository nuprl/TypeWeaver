'use strict';

export default function union(): any[] {
  var args: any[] = [].concat.apply([], arguments);
  var len: number = args.length;
  var seen: {} = {};
  var res: any[] = [];

  while (len--) {
    var ele: any = args[len];
    if (!!seen[ele]) {
      continue;
    }
    res.push(seen[ele] = ele);
  }

  return res;
};
