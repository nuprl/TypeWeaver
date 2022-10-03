'use strict';

var slice: any = require('array-slice');

module.exports = function () {
  var args: any[] = slice(arguments);

  do {
    args = [].concat.apply([], args);
  } while (args.some(Array.isArray));

  return args;
};