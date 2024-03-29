'use strict';

const constants: RegExp = exports;

// Helper
constants._reverse = function reverse(map: object): object {
  const res: object = {};

  Object.keys(map).forEach(function(key: number) {
    // Convert key to integer if it is stringified
    if ((key | 0) == key)
      key = key | 0;

    const value: string = map[key];
    res[value] = key;
  });

  return res;
};

constants.der = require('./der');
