'use strict';

module.exports = function repeat(ele: String, num: Number): String {
  var res: Array = [ele];
  var max: Number = num;

  while (num--) {
    res.push.apply(res, res);
    if (res.length >= max) {
      break;
    }
  }

  return res.slice(0, max);
};
