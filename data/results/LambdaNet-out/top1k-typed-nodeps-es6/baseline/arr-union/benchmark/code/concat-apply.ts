'use strict';

import unique from 'array-unique';

export default function union(arr: string): string {
  return unique([].concat.apply([], arguments));
};
