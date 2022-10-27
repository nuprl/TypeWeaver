'use strict';

module.exports = function(arr: Array) {
  var i: Number = arr.length;

  var hash: Object = Object.create(null);
  var res: Array = [];

  while (i--) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      res.push(arr[i]);
    }
  }
  return res;
};
