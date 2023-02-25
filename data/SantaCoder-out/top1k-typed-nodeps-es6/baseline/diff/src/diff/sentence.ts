import Diff from './base';


export const sentenceDiff = new Diff();
sentenceDiff.tokenize = function(value: string) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};

export function diffSentences(oldStr: string, newStr: string, callback: any) { return sentenceDiff.diff(oldStr, newStr, callback); }