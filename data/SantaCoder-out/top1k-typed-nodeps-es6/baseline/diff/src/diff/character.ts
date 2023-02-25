import Diff from './base';

export const characterDiff = new Diff();
export function diffChars(oldStr: string, newStr: string, options: DiffOptions) { return characterDiff.diff(oldStr, newStr, options); }