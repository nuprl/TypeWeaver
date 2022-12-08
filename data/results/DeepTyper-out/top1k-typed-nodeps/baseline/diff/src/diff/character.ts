import Diff from './base';

export const characterDiff: Column[] = new Diff();
export function diffChars(oldStr: string, newStr: string, options: Options): string { return characterDiff.diff(oldStr, newStr, options); }
