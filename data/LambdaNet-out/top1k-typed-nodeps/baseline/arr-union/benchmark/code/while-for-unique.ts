'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: Array): Void {
  var len: Number = arguments.length, i: Number = 0;

  while (++i < len) {
    var arg: Array = arguments[i];

    for (var j = 0; j < arg.length; j++) {
      init.push(arg[j]);
    }
  }
  return unique(init);
};
