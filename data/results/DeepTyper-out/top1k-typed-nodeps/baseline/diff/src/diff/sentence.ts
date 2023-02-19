import Diff from './base';


export const sentenceDiff: ReadonlyArray<string> = new Diff();
sentenceDiff.tokenize = function(value: string) {
  return value.split(/(\S.+?[.!?])(?=\s+|$)/);
};

export function diffSentences(oldStr: string, newStr: string, callback: Function): string { return sentenceDiff.diff(oldStr, newStr, callback); }
