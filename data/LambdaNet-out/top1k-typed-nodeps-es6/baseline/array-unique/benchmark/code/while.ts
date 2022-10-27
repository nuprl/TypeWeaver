'use strict';

export default function(arr: Array) {
  var len: Number = arr.length;
  var res: Array = [];

  while (len--) {
    var curr: String = arr[len];
    if (res.indexOf(curr) === -1) {
      res.push(curr);
    }
  }
  return res;
};
