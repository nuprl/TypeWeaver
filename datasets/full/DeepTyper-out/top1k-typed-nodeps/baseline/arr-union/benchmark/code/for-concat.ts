'use strict';

var unique: any = require('array-unique');

module.exports = function union(init: any): any {
  var len: number = arguments.length;

  for (var i = 1; i < len; i++) {
    init = init.concat(arguments[i]);
  }

  return unique(init);
};
