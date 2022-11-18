'use strict';

export default function(arr: any[]) {
  var set: any[] = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    var value: string = arr[i];
    for (var j = len; --j > i;) {
      if (value === arr[j]) {
        break;
      }
    }

    if (j == i) {
      set.push(value);
    }
  }
  return set;
};
