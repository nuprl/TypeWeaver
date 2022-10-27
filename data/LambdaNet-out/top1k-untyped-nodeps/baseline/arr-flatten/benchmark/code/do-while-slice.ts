'use strict';

var slice: Function = require('array-slice');

module.exports = function () {
  var args: Array = slice(arguments);

  do {
    args = [].concat.apply([], args);
  } while (args.some(Array.isArray));

  return args;
};