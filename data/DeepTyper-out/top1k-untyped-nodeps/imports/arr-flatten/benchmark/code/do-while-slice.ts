'use strict';

import slice from 'array-slice';

module.exports = function () {
  var args: any[] = slice(arguments);

  do {
    args = [].concat.apply([], args);
  } while (args.some(Array.isArray));

  return args;
};