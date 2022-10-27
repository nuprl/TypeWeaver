import Diff from './base';


export const sentenceDiff: HTMLElement = new Diff();
sentenceDiff.tokenize = function(value: String) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};

export function diffSentences(oldStr: String, newStr: String, callback: Function): Boolean { return sentenceDiff.diff(oldStr, newStr, callback); }
