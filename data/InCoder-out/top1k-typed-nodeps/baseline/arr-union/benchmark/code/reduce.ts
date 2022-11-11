'use strict';

var unique = require('array-unique');

module.exports = function union(init/*: Array<T>,  arrays*/: Array<T>[]) {
  var arrays = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: number,  arr: number[]) {
    return acc.concat(arr);
  }, init));
};