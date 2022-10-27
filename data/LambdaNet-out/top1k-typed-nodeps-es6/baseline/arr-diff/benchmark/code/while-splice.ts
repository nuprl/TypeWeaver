'use strict';

export default function diff(arr: Array, arrays: Array): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  arrays.forEach(function(value: String) {
    var idx: Number = arr.indexOf(value);
    while (idx !== -1) {
      arr.splice(idx, 1);
      idx = arr.indexOf(value);
    }
  });

  return arr;
};
