import Diff from './base';

export const cssDiff: any[] = new Diff();
cssDiff.tokenize = function(value: string) {
  return value.split(/([{}:;,]|\s+)/);
};

export function diffCss(oldStr: string, newStr: string, callback: string): boolean { return cssDiff.diff(oldStr, newStr, callback); }
