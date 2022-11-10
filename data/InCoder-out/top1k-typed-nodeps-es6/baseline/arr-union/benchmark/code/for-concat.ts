'use strict';

import unique from 'array-unique';

export default function union(init: Array<any>) {
  var len = arguments.length;

  for (var i = 1; i < len; i++) {
    init = init.concat(arguments[i]);
  }

  return unique(init);
};