import Diff from './base';

export const characterDiff: Array = new Diff();
export function diffChars(oldStr: String, newStr: String, options: Object): String { return characterDiff.diff(oldStr, newStr, options); }
