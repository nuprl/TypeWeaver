'use strict';

var unique: any = require('array-unique');

module.exports = function union(init: any): any[] {
  var arr: any[] = [].slice.call(arguments, 1);
  var len: number = arr.length;

  for (var i = 0; i < len; i++) {
    init = init.concat(arr[i]);
  }

  init = unique(init);
  return init;
};
