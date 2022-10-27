'use strict';

var unique: Function = require('array-unique');

module.exports = function diff(init: Array): Void {
  var args: Array = [].slice.call(arguments, 1);

  args.forEach(function (arr: Array) {
    arr.forEach(function(ele: String) {
      init.push(ele);
    });
  });

  return unique(init);
};
