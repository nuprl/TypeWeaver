'use strict';

var repeating: Function = require('repeating');

module.exports = function(str: string, num: string) {
  return repeating(num, str);
};
