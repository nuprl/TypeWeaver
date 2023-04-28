import Diff from './base';

export const characterDiff = new Diff();
export function diffChars(oldStr: string, newStr: string, options: Options) { return characterDiff.diff(oldStr, newStr, options); }