'use strict';

import unique from 'array-unique';

export default function union(): any[] {
  var len: number = arguments.length;
  var res: any[] = [];

  while (len--) {
    res = res.concat(arguments[len]);
  }
  return unique(res);
};
