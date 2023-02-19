import Diff from './base';

export const cssDiff = new Diff();
cssDiff.tokenize = function(value: any) {
  return value.split(/([{}:;,]|\s+)/);
};

export function diffCss(oldStr: string | string[],  newStr: string | string[],  callback: Function) { return cssDiff.diff(oldStr, newStr, callback); }