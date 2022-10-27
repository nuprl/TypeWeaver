'use strict';

module.exports = function(arr: Array) {
  var len: Number = arr.length;
  var res: Array = [];
  var o: Object = {};
  var i: Number;

  for (i = 0; i < len; i += 1) {
    o[arr[i]] = arr[i];
  }

  for (i in o) {
    res.push(o[i]);
  }
  return res;
};
