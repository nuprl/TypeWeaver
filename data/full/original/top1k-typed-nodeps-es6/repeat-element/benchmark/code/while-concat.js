'use strict';

export default function repeat(ele, num) {
  var res = [];

  while (num--) {
    res = res.concat(ele);
  }

  return res;
};
