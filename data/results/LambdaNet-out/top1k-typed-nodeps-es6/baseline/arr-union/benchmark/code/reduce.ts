'use strict';

import unique from 'array-unique';

export default function union(init: object/*, arrays*/): string {
  var arrays: any[] = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: any[], arr: any[]) {
    return acc.concat(arr);
  }, init));
};
