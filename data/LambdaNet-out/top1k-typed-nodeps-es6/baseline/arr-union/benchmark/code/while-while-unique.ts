'use strict';

import unique from 'array-unique';

export default function union(init: Array): String {
  var len: Number = arguments.length, i: Number = 0;

  while (++i < len) {
    var arg: Array = arguments[i];
    var alen: Number = arg.length;

    while (alen--) {
      init.push(arg[alen]);
    }
  }
  return unique(init);
};
