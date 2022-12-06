'use strict';

module.exports = function union(): any[] {
  var arr: any[] = [].concat.apply([], arguments);
  var len: number = arr.length;
  var res: any[] = [];

  while (len--) {
    var ele: any = arr[len];
    if (res.indexOf(ele) === -1) {
      res.push(ele);
    }
  }
  return res;
};
