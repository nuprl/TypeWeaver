import {diffLines} from '../diff/line';

export function structuredPatch(oldFileName: string, newFileName: string, oldStr: string, newStr: string, oldHeader: string, newHeader: string, options: object): object {
  if (!options) {
    options = {};
  }
  if (typeof options.context === 'undefined') {
    options.context = 4;
  }

  const diff: any[] = diffLines(oldStr, newStr, options);
  if(!diff) {
    return;
  }

  diff.push({value: '', lines: []}); // Append an empty value to make cleanup easier

  function contextLines(lines: any[]): any[] {
    return lines.map(function(entry: string) { return ' ' + entry; });
  }

  let hunks: any[] = [];
  let oldRangeStart: number = 0, newRangeStart: number = 0, curRange: any[] = [],
      oldLine: number = 1, newLine: number = 1;
  for (let i = 0; i < diff.length; i++) {
    const current: object = diff[i],
          lines: any[] = current.lines || current.value.replace(/\n$/, '').split('\n');
    current.lines = lines;

    if (current.added || current.removed) {
      // If we have previous context, start with that
      if (!oldRangeStart) {
        const prev: string = diff[i - 1];
        oldRangeStart = oldLine;
        newRangeStart = newLine;

        if (prev) {
          curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
          oldRangeStart -= curRange.length;
          newRangeStart -= curRange.length;
        }
      }

      // Output our changes
      curRange.push(... lines.map(function(entry: string) {
        return (current.added ? '+' : '-') + entry;
      }));

      // Track the updated file position
      if (current.added) {
        newLine += lines.length;
      } else {
        oldLine += lines.length;
      }
    } else {
      // Identical context lines. Track line changes
      if (oldRangeStart) {
        // Close out any changes that have been output (or join overlapping)
        if (lines.length <= options.context * 2 && i < diff.length - 2) {
          // Overlapping
          curRange.push(... contextLines(lines));
        } else {
          // end the range and output
          let contextSize: number = Math.min(lines.length, options.context);
          curRange.push(... contextLines(lines.slice(0, contextSize)));

          let hunk: object = {
            oldStart: oldRangeStart,
            oldLines: (oldLine - oldRangeStart + contextSize),
            newStart: newRangeStart,
            newLines: (newLine - newRangeStart + contextSize),
            lines: curRange
          };
          if (i >= diff.length - 2 && lines.length <= options.context) {
            // EOF is inside this hunk
            let oldEOFNewline: boolean = ((/\n$/).test(oldStr));
            let newEOFNewline: boolean = ((/\n$/).test(newStr));
            let noNlBeforeAdds: boolean = lines.length == 0 && curRange.length > hunk.oldLines;
            if (!oldEOFNewline && noNlBeforeAdds && oldStr.length > 0) {
              // special case: old has no eol and no trailing context; no-nl can end up before adds
              // however, if the old file is empty, do not output the no-nl line
              curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
            }
            if ((!oldEOFNewline && !noNlBeforeAdds) || !newEOFNewline) {
              curRange.push('\\ No newline at end of file');
            }
          }
          hunks.push(hunk);

          oldRangeStart = 0;
          newRangeStart = 0;
          curRange = [];
        }
      }
      oldLine += lines.length;
      newLine += lines.length;
    }
  }

  return {
    oldFileName: oldFileName, newFileName: newFileName,
    oldHeader: oldHeader, newHeader: newHeader,
    hunks: hunks
  };
}

export function formatPatch(diff: object): string {
  const ret: any[] = [];
  if (diff.oldFileName == diff.newFileName) {
    ret.push('Index: ' + diff.oldFileName);
  }
  ret.push('===================================================================');
  ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
  ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

  for (let i = 0; i < diff.hunks.length; i++) {
    const hunk: string = diff.hunks[i];
    // Unified Diff Format quirk: If the chunk size is 0,
    // the first number is one lower than one would expect.
    // https://www.artima.com/weblogs/viewpost.jsp?thread=164293
    if (hunk.oldLines === 0) {
      hunk.oldStart -= 1;
    }
    if (hunk.newLines === 0) {
      hunk.newStart -= 1;
    }
    ret.push(
      '@@ -' + hunk.oldStart + ',' + hunk.oldLines
      + ' +' + hunk.newStart + ',' + hunk.newLines
      + ' @@'
    );
    ret.push.apply(ret, hunk.lines);
  }

  return ret.join('\n') + '\n';
}

export function createTwoFilesPatch(oldFileName: string, newFileName: string, oldStr: string, newStr: number, oldHeader: number, newHeader: number, options: object): string {
  return formatPatch(structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options));
}

export function createPatch(fileName: string, oldStr: string, newStr: string, oldHeader: string, newHeader: number, options: object): string {
  return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
}
