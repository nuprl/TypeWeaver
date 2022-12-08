'use strict';

var unique: any = require('array-unique');

module.exports = function union(arr: any): any {
  return unique([].concat.apply([], arguments));
};
