'use strict';

export default function diff(arr: Array<any>, arrays: Array<Array<any>>) {
  arrays = [].concat.apply([], [].slice.call(arguments, 1));

  return arr.reduce(function(acc: number, ele: number, i: number) {
    if (arrays.indexOf(ele) === -1) {
      acc.push(ele);
    }
    return acc;
  }, []);
};