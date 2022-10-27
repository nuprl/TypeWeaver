'use strict';

export default function repeat(ele: Function, num: String): String {
  var res: Array = [ele];

  while (res.length < num) {
    res = res.concat(res);
  }

  return res.slice(0, num);
};
