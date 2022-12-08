'use strict';

import unique from 'array-unique';

export default function union() {
  var len = arguments.length;
  var res = [];

  while (len--) {
    res = res.concat(arguments[len]);
  }
  return unique(res);
};