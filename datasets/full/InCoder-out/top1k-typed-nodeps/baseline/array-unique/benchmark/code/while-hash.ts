'use strict';

module.exports = function(arr: number[]) {
  var i = arr.length;

  var hash = Object.create(null);
  var res = [];

  while (i--) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      res.push(arr[i]);
    }
  }
  return res;
};