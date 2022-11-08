'use strict';

export default function diff(arr: Array,  arrays: Array) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc: any,  ele: any,  i: number) {
    if (arrays.indexOf(ele) === -1) {
      return acc.concat(ele);
    }
    return acc;
  }, []);
};