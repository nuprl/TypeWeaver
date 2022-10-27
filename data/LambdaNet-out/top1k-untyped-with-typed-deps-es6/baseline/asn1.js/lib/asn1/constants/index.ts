'use strict';

const constants: RegExp = exports;

// Helper
constants._reverse = function reverse(map: Object): Object {
  const res: Object = {};

  Object.keys(map).forEach(function(key: Number) {
    // Convert key to integer if it is stringified
    if ((key | 0) == key)
      key = key | 0;

    const value: String = map[key];
    res[value] = key;
  });

  return res;
};

constants.der = require('./der');
