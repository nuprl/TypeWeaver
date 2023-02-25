'use strict';

var unique = require('array-unique');

module.exports = function diff(init: any) {
  var args = [].slice.call(arguments, 1);

  args.forEach(function (arr: any[]) {
    arr.forEach(function(ele: HTMLElement) {
      init.push(ele);
    });
  });

  return unique(init);
};