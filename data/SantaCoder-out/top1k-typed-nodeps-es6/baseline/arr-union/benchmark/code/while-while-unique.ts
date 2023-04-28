'use strict';

import unique from 'array-unique';

export default function union(init: T) {
  var len = arguments.length, i = 0;

  while (++i < len) {
    var arg = arguments[i];
    var alen = arg.length;

    while (alen--) {
      init.push(arg[alen]);
    }
  }
  return unique(init);
};