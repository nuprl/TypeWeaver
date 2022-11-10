'use strict';

var unique = require('array-unique');

module.exports = function union(arr: Array<any>) {
  return unique([].concat.apply([], arguments));
};