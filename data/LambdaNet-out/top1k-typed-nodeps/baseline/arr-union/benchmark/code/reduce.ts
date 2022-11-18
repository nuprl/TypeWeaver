'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: object/*, arrays*/): Void {
  var arrays: any[] = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: any[], arr: any[]) {
    return acc.concat(arr);
  }, init));
};
