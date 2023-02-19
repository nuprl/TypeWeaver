import Diff from './base';

export const characterDiff = new Diff();
export function diffChars(oldStr: string | string[],  newStr: string | string[],  options: DiffOptions) { return characterDiff.diff(oldStr, newStr, options); }