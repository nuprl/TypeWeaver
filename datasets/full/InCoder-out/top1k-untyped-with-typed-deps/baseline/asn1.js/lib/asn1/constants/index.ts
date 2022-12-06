'use strict';

const constants = exports;

// Helper
constants._reverse = function reverse(map: Map<string, string>) {
  const res = {};

  Object.keys(map).forEach(function(key: any) {
    // Convert key to integer if it is stringified
    if ((key | 0) == key)
      key = key | 0;

    const value = map[key];
    res[value] = key;
  });

  return res;
};

constants.der = require('./der');