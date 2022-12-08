'use strict';

import unique from 'array-unique';

export default function union(init) {
  var len = arguments.length, i = 0;

  while (++i < len) {
    init.push.apply(init, arguments[i]);
  }
  return unique(init);
};
