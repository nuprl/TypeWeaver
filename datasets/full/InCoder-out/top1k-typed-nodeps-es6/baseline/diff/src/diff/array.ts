import Diff from './base';

export const arrayDiff = new Diff();
arrayDiff.tokenize = function(value: Array<number>) {
  return value.slice();
};
arrayDiff.join = arrayDiff.removeEmpty = function(value: any) {
  return value;
};

export function diffArrays(oldArr: Array,  newArr: Array,  callback: Function) { return arrayDiff.diff(oldArr, newArr, callback); }