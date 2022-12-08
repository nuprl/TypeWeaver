'use strict';

module.exports = function(arr: any) {
  var len: number = arr.length;
  var res: any[] = [];

  while (len--) {
    var curr: any = arr[len];
    if (res.indexOf(curr) === -1) {
      res.push(curr);
    }
  }
  return res;
};
