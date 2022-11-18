'use strict';

module.exports = function union(): any[] {
  var args: any[] = [].concat.apply([], arguments);
  var len: number = args.length;
  var seen: object = {};
  var res: any[] = [];

  while (len--) {
    var ele: string = args[len];
    if (!!seen[ele]) {
      continue;
    }
    res.push(seen[ele] = ele);
  }

  return res;
};
