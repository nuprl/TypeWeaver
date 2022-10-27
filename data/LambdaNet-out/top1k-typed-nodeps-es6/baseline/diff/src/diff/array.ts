import Diff from './base';

export const arrayDiff: Map = new Diff();
arrayDiff.tokenize = function(value: Array) {
  return value.slice();
};
arrayDiff.join = arrayDiff.removeEmpty = function(value: Number) {
  return value;
};

export function diffArrays(oldArr: String, newArr: String, callback: Function): Boolean { return arrayDiff.diff(oldArr, newArr, callback); }
