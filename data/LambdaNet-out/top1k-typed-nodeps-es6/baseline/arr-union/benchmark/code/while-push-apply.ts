'use strict';

import unique from 'array-unique';

export default function union(init: any[]): string {
  var len: number = arguments.length, i: number = 0;

  while (++i < len) {
    init.push.apply(init, arguments[i]);
  }
  return unique(init);
};
