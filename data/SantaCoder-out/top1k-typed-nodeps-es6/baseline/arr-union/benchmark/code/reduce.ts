'use strict';

import unique from 'array-unique';

export default function union(init/*: Array<T>, arrays*/: Array<T>) {
  var arrays = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: T[], arr: T[]) {
    return acc.concat(arr);
  }, init));
};