'use strict';

import unique from 'array-unique';

export default function union(init) {
  var len = arguments.length, i = 0;

  while (++i < len) {
    var arg = arguments[i];

    for (var j = 0; j < arg.length; j++) {
      init.push(arg[j]);
    }
  }
  return unique(init);
};
