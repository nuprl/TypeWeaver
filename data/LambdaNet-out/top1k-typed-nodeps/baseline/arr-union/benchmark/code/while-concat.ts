'use strict';

var unique: Function = require('array-unique');

module.exports = function union(): Void {
  var len: number = arguments.length;
  var res: any[] = [];

  while (len--) {
    res = res.concat(arguments[len]);
  }
  return unique(res);
};
