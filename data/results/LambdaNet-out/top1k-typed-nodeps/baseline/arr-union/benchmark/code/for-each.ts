'use strict';

var unique: Function = require('array-unique');

module.exports = function diff(init: any[]): void {
  var args: any[] = [].slice.call(arguments, 1);

  args.forEach(function (arr: any[]) {
    arr.forEach(function(ele: string) {
      init.push(ele);
    });
  });

  return unique(init);
};
