'use strict';

var unique: Function = require('array-unique');

module.exports = function union(): Void {
  var len: Number = arguments.length;
  var res: Array = [];

  while (len--) {
    res = res.concat(arguments[len]);
  }
  return unique(res);
};
