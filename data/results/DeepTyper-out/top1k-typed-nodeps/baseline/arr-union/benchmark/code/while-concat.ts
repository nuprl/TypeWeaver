'use strict';

var unique: any = require('array-unique');

module.exports = function union(): any {
  var len: number = arguments.length;
  var res: any[] = [];

  while (len--) {
    res = res.concat(arguments[len]);
  }
  return unique(res);
};
