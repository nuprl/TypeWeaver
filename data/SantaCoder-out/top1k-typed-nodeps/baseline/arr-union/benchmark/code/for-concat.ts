'use strict';

var unique = require('array-unique');

module.exports = function union(init: T) {
  var len = arguments.length;

  for (var i = 1; i < len; i++) {
    init = init.concat(arguments[i]);
  }

  return unique(init);
};