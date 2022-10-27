'use strict';

import unique from 'array-unique';

export default function union(): Array {
  var len: Number = arguments.length;
  var res: Array = [];

  while (len--) {
    res = res.concat(arguments[len]);
  }
  return unique(res);
};
