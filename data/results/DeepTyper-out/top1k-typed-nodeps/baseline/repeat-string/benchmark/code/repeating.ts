'use strict';

var repeating: any = require('repeating');

module.exports = function(str: string, num: number) {
  return repeating(num, str);
};
