'use strict';

export default function diff(arr: Array<any>, arrays: Array<any>) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));
  return arr.filter(function(ele: any) {
    return arrays.indexOf(ele) === -1;
  });
};