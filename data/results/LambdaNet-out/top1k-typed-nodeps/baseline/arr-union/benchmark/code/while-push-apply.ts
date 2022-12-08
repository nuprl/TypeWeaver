'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: any[]): void {
  var len: number = arguments.length, i: number = 0;

  while (++i < len) {
    init.push.apply(init, arguments[i]);
  }
  return unique(init);
};
