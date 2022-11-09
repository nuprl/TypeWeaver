'use strict';

export default function diff(arr: Array, arrays: String): Array {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc: Object, ele: String, i: String) {
    if (arrays.indexOf(ele) === -1) {
      return acc.concat(ele);
    }
    return acc;
  }, []);
};
