import Diff from './base';

export const characterDiff: any[] = new Diff();
export function diffChars(oldStr: string, newStr: string, options: object): string { return characterDiff.diff(oldStr, newStr, options); }
