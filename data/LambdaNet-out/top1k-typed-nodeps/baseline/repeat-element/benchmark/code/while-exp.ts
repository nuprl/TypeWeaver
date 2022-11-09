'use strict';

module.exports = function repeat(ele: String, num: String): String {
  var res: Array = [ele];

  while (res.length < num) {
    res = res.concat(res);
  }

  return res.slice(0, num);
};
