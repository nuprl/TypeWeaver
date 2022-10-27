'use strict';

import unique from 'array-unique';

export default function union(init: Array): String {
  var len: Number = arguments.length, i: Number = 0;

  while (++i < len) {
    init.push.apply(init, arguments[i]);
  }
  return unique(init);
};
