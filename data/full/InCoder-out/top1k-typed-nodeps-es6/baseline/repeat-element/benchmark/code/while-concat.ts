'use strict';

export default function repeat(ele: any,  num: number) {
  var res = [];

  while (num--) {
    res = res.concat(ele);
  }

  return res;
};