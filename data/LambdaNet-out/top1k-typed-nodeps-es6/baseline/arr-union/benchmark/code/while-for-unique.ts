'use strict';

import unique from 'array-unique';

export default function union(init: Array): String {
  var len: Number = arguments.length, i: Number = 0;

  while (++i < len) {
    var arg: Array = arguments[i];

    for (var j = 0; j < arg.length; j++) {
      init.push(arg[j]);
    }
  }
  return unique(init);
};
