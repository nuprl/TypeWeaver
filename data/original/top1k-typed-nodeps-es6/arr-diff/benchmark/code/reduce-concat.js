'use strict';

export default function diff(arr, arrays) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc, ele, i) {
    if (arrays.indexOf(ele) === -1) {
      return acc.concat(ele);
    }
    return acc;
  }, []);
};
