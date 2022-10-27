'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: Object/*, arrays*/): Void {
  var arrays: Array = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: Array, arr: Array) {
    return acc.concat(arr);
  }, init));
};
