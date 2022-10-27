'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: Array): Void {
  var len: Number = arguments.length, i: Number = 0;

  while (++i < len) {
    init.push.apply(init, arguments[i]);
  }
  return unique(init);
};
