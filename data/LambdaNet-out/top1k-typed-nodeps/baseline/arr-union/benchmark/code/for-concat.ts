'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: Object): Void {
  var len: Number = arguments.length;

  for (var i = 1; i < len; i++) {
    init = init.concat(arguments[i]);
  }

  return unique(init);
};
