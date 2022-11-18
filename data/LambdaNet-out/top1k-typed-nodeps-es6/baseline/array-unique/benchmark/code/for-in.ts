'use strict';

export default function(arr: any[]) {
  var len: number = arr.length;
  var res: any[] = [];
  var o: object = {};
  var i: number;

  for (i = 0; i < len; i += 1) {
    o[arr[i]] = arr[i];
  }

  for (i in o) {
    res.push(o[i]);
  }
  return res;
};
