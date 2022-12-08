'use strict';

module.exports = function(arr: any) {
  var i: number = arr.length;

  var hash: any = Object.create(null);
  var res: any[] = [];

  while (i--) {
    if (!hash[arr[i]]) {
      hash[arr[i]] = true;
      res.push(arr[i]);
    }
  }
  return res;
};
