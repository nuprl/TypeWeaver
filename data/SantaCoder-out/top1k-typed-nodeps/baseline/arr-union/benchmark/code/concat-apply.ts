'use strict';

var unique = require('array-unique');

module.exports = function union(arr: any[]) {
  return unique([].concat.apply([], arguments));
};