'use strict';

var unique = require('array-unique');

module.exports = function union(init/*: Array,  arrays*/: Array<Array>) {
  var arrays = [].slice.call(arguments, 1);

  return unique(arrays.reduce(function (acc: Array<any>,  arr: Array<any>) {
    return acc.concat(arr);
  }, init));
};