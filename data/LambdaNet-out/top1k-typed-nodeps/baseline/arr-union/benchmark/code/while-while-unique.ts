'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: Array): Void {
  var len: Number = arguments.length, i: Number = 0;

  while (++i < len) {
    var arg: Array = arguments[i];
    var alen: Number = arg.length;

    while (alen--) {
      init.push(arg[alen]);
    }
  }
  return unique(init);
};
