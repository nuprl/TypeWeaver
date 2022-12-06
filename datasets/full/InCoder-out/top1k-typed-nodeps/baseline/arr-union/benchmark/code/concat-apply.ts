'use strict';

var unique = require('array-unique');

module.exports = function union(arr: number[]) {
  return unique([].concat.apply([], arguments));
};