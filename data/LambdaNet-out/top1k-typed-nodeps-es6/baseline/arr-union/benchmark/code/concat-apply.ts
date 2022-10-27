'use strict';

import unique from 'array-unique';

export default function union(arr: String): String {
  return unique([].concat.apply([], arguments));
};
