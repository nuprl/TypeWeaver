import Diff from './base';

export const arrayDiff: any = new Diff();
arrayDiff.tokenize = function(value: string) {
  return value.slice();
};
arrayDiff.join = arrayDiff.removeEmpty = function(value: string) {
  return value;
};

export function diffArrays(oldArr: any, newArr: string, callback: any): any { return arrayDiff.diff(oldArr, newArr, callback); }
