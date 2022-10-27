'use strict';

module.exports = function union(): Array {
  var args: Array = [].concat.apply([], arguments);
  var len: Number = args.length;
  var seen: Object = {};
  var res: Array = [];

  while (len--) {
    var ele: String = args[len];
    if (!!seen[ele]) {
      continue;
    }
    res.push(seen[ele] = ele);
  }

  return res;
};
