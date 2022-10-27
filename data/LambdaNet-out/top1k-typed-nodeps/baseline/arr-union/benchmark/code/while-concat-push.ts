'use strict';

module.exports = function union(): Array {
  var arr: Array = [].concat.apply([], arguments);
  var len: Number = arr.length;
  var res: Array = [];

  while (len--) {
    var ele: String = arr[len];
    if (res.indexOf(ele) === -1) {
      res.push(ele);
    }
  }
  return res;
};
