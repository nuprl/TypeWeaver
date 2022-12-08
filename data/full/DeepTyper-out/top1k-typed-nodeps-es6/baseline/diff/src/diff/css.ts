import Diff from './base';

export const cssDiff: ReadonlyArray<string> = new Diff();
cssDiff.tokenize = function(value: string) {
  return value.split(/([{}:;,]|\s+)/);
};

export function diffCss(oldStr: string, newStr: string, callback: Function): string { return cssDiff.diff(oldStr, newStr, callback); }
