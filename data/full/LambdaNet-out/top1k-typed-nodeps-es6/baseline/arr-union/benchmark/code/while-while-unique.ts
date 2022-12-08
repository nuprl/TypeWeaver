'use strict';

import unique from 'array-unique';

export default function union(init: any[]): string {
  var len: number = arguments.length, i: number = 0;

  while (++i < len) {
    var arg: any[] = arguments[i];
    var alen: number = arg.length;

    while (alen--) {
      init.push(arg[alen]);
    }
  }
  return unique(init);
};
