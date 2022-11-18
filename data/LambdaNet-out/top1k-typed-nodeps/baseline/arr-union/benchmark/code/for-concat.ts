'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: object): Void {
  var len: number = arguments.length;

  for (var i = 1; i < len; i++) {
    init = init.concat(arguments[i]);
  }

  return unique(init);
};
