'use strict';

import unique from 'array-unique';

export default function union(init: Object): String {
  var len: Number = arguments.length;

  for (var i = 1; i < len; i++) {
    init = init.concat(arguments[i]);
  }

  return unique(init);
};
