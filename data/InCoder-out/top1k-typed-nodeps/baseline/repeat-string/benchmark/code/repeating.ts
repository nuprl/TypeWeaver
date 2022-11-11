'use strict';

var repeating = require('repeating');

module.exports = function(str: any,  num: number) {
  return repeating(num, str);
};