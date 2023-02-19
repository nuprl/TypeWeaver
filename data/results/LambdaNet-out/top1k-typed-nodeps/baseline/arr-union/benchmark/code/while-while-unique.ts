'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: any[]): void {
  var len: number = arguments.length, i: number = 0;

  while (++i < len) {
    var arg: any[] = arguments[i];
    var alen: number = arg.length;

    while (alen--) {
      init.push(arg[alen]);
    }
  }
  return unique(init);
};
