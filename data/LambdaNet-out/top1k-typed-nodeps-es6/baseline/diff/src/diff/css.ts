import Diff from './base';

export const cssDiff: Array = new Diff();
cssDiff.tokenize = function(value: String) {
  return value.split(/([{}:;,]|\s+)/);
};

export function diffCss(oldStr: String, newStr: String, callback: String): Boolean { return cssDiff.diff(oldStr, newStr, callback); }
