'use strict';

import unique from 'array-unique';

export default function union(init: any[]): string {
  var len: number = arguments.length, i: number = 0;

  while (++i < len) {
    var arg: any[] = arguments[i];

    for (var j = 0; j < arg.length; j++) {
      init.push(arg[j]);
    }
  }
  return unique(init);
};
