'use strict';

import unique from 'array-unique';

export default function union(arr) {
  return unique([].concat.apply([], arguments));
};
