'use strict';

import unique from 'array-unique';

export default function union(init/*, arrays*/) {
  var arrays = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc, arr) {
    return acc.concat(arr);
  }, init));
};
