'use strict';

export default function diff(arr: Array,  arrays: Array) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  var result = [];

  arr.forEach(function(key: any) {
    if (arrays.indexOf(key) === -1) {
      result.push(key);
    }
  });

  return result;
};