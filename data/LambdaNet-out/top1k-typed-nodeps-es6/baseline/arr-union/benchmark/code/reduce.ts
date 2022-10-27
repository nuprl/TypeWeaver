'use strict';

import unique from 'array-unique';

export default function union(init: Object/*, arrays*/): String {
  var arrays: Array = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: Array, arr: Array) {
    return acc.concat(arr);
  }, init));
};
