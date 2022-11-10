'use strict';

var repeating = require('repeating');

module.exports = function(str: number,  num: number) {
  return repeating(num, str);
};