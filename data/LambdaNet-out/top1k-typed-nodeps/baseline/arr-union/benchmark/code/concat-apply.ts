'use strict';

var unique: Function = require('array-unique');

module.exports = function union(arr: Function): void {
  return unique([].concat.apply([], arguments));
};
