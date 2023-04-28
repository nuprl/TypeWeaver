'use strict';

var unique = require('array-unique');

module.exports = function union(init/*: any[], arrays*/: any[]) {
  var arrays = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: any[], arr: any[]) {
    return acc.concat(arr);
  }, init));
};