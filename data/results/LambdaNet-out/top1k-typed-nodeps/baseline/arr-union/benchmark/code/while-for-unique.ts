'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: any[]): void {
  var len: number = arguments.length, i: number = 0;

  while (++i < len) {
    var arg: any[] = arguments[i];

    for (var j = 0; j < arg.length; j++) {
      init.push(arg[j]);
    }
  }
  return unique(init);
};
