'use strict';

var repeating: Function = require('repeating');

module.exports = function(str: String, num: String) {
  return repeating(num, str);
};
