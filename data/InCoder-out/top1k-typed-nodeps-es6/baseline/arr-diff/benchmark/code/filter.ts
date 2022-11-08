'use strict';

export default function diff(arr: Array,  arrays: Array) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  return arr.filter(function(ele: Element) {
    return arrays.indexOf(ele) === -1;
  });
};