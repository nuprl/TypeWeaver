import Diff from './base';
import {generateOptions} from '../util/params';

export const lineDiff: string[] = new Diff();
lineDiff.tokenize = function(value: string) {
  let retLines: any[] = [],
      linesAndNewlines = value.split(/(\n|\r\n)/);

  // Ignore the final empty token that occurs if the string ends with a new line
  if (!linesAndNewlines[linesAndNewlines.length - 1]) {
    linesAndNewlines.pop();
  }

  // Merge the content and line separators into single tokens
  for (let i = 0; i < linesAndNewlines.length; i++) {
    let line: string = linesAndNewlines[i];

    if (i % 2 && !this.options.newlineIsToken) {
      retLines[retLines.length - 1] += line;
    } else {
      if (this.options.ignoreWhitespace) {
        line = line.trim();
      }
      retLines.push(line);
    }
  }

  return retLines;
};

export function diffLines(oldStr: string, newStr: string, callback: Function): string { return lineDiff.diff(oldStr, newStr, callback); }
export function diffTrimmedLines(oldStr: string, newStr: string, callback: Function): string {
  let options: Options = generateOptions(callback, {ignoreWhitespace: true});
  return lineDiff.diff(oldStr, newStr, options);
}
