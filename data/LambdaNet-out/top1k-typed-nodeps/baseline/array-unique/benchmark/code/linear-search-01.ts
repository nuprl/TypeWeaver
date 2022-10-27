'use strict';

module.exports = function(arr: Array) {
  var set: Array = [];

  for (var i = 0, len = arr.length; i < len; i++) {
    var value: String = arr[i];
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
