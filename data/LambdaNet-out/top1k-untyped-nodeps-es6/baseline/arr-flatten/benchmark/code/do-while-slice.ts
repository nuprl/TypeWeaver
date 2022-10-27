'use strict';

import slice from 'array-slice';

export default function () {
  var args: Array = slice(arguments);

  do {
    args = [].concat.apply([], args);
  } while (args.some(Array.isArray));

  return args;
};