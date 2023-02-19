import Diff from './base';

export const arrayDiff: Map = new Diff();
arrayDiff.tokenize = function(value: any[]) {
  return value.slice();
};
arrayDiff.join = arrayDiff.removeEmpty = function(value: number) {
  return value;
};

export function diffArrays(oldArr: string, newArr: string, callback: Function): boolean { return arrayDiff.diff(oldArr, newArr, callback); }
