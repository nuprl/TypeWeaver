'use strict';

export default function repeat(ele: Function, num: Number): Array {
  var res: Array = [];

  while (num--) {
    res = res.concat(ele);
  }

  return res;
};
