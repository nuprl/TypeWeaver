'use strict';

export default function diff(arr, arrays) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  return arr.filter(function(ele) {
    return arrays.indexOf(ele) === -1;
  });
};
