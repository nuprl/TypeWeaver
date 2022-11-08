import Diff from './base';

export const characterDiff = new Diff();
export function diffChars(oldStr: string | undefined,  newStr: string | undefined,  options: { ignoreWhitespace: true }) { return characterDiff.diff(oldStr, newStr, options); }