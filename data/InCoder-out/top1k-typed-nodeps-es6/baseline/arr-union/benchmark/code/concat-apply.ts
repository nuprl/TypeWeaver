'use strict';

import unique from 'array-unique';

export default function union(arr: number[]) {
  return unique([].concat.apply([], arguments));
};