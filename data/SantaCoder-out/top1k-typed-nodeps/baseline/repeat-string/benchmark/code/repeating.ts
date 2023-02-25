'use strict';

var repeating = require('repeating');

module.exports = function(str: string, num: number) {
  return repeating(num, str);
};