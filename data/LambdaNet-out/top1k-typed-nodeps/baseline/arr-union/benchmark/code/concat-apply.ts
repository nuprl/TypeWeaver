'use strict';

var unique: Function = require('array-unique');

module.exports = function union(arr: Function): Void {
  return unique([].concat.apply([], arguments));
};
