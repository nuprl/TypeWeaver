import Diff from './base';

export const cssDiff = new Diff();
cssDiff.tokenize = function(value: string) {
  return value.split(/([{}:;,]|\s+)/);
};

export function diffCss(oldStr: string, newStr: string, callback: any) { return cssDiff.diff(oldStr, newStr, callback); }