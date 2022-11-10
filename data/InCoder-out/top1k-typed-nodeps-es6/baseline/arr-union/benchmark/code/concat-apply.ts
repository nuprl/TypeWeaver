'use strict';

import unique from 'array-unique';

export default function union(arr: Array<any>) {
  return unique([].concat.apply([], arguments));
};