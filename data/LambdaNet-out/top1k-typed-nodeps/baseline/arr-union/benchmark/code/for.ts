'use strict';

var unique: Function = require('array-unique');

module.exports = function union(init: Object): Object {
  var arr: Array = [].slice.call(arguments, 1);
  var len: Number = arr.length;

  for (var i = 0; i < len; i++) {
    init = init.concat(arr[i]);
  }

  init = unique(init);
  return init;
};
