import {parsePatch} from './parse';
import distanceIterator from '../util/distance-iterator';

export function applyPatch(source, uniDiff, options = {}) {
  if (typeof uniDiff === 'string') {
    uniDiff = parsePatch(uniDiff);
  }

  if (Array.isArray(uniDiff)) {
    if (uniDiff.length > 1) {
      throw new Error('applyPatch only works with a single input.');
    }

    uniDiff = uniDiff[0];
  }

  // Apply the diff to the input
  let lines: string[] = source.split(/\r\n|[\n\v\f\r\x85]/),
      delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
      hunks = uniDiff.hunks,

      compareLine = options.compareLine || ((lineNumber: number, line: number, operation: any, patchContent: number) => line === patchContent),
      errorCount = 0,
      fuzzFactor = options.fuzzFactor || 0,
      minLine = 0,
      offset = 0,

      removeEOFNL,
      addEOFNL;

  /**
   * Checks if the hunk exactly fits on the provided location
   */
  function hunkFits(hunk: any, toPos: number): boolean {
    for (let j = 0; j < hunk.lines.length; j++) {
      let line: number = hunk.lines[j],
          operation = (line.length > 0 ? line[0] : ' '),
          content = (line.length > 0 ? line.substr(1) : line);

      if (operation === ' ' || operation === '-') {
        // Context sanity check
        if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
          errorCount++;

          if (errorCount > fuzzFactor) {
            return false;
          }
        }
        toPos++;
      }
    }

    return true;
  }

  // Search best fit offsets for each hunk based on the previous ones
  for (let i = 0; i < hunks.length; i++) {
    let hunk: any = hunks[i],
        maxLine = lines.length - hunk.oldLines,
        localOffset = 0,
        toPos = offset + hunk.oldStart - 1;

    let iterator: number = distanceIterator(toPos, minLine, maxLine);

    for (; localOffset !== undefined; localOffset = iterator()) {
      if (hunkFits(hunk, toPos + localOffset)) {
        hunk.offset = offset += localOffset;
        break;
      }
    }

    if (localOffset === undefined) {
      return false;
    }

    // Set lower text limit to end of the current hunk, so next ones don't try
    // to fit over already patched text
    minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
  }

  // Apply patch hunks
  let diffOffset: number = 0;
  for (let i = 0; i < hunks.length; i++) {
    let hunk: any = hunks[i],
        toPos = hunk.oldStart + hunk.offset + diffOffset - 1;
    diffOffset += hunk.newLines - hunk.oldLines;

    for (let j = 0; j < hunk.lines.length; j++) {
      let line: number = hunk.lines[j],
          operation = (line.length > 0 ? line[0] : ' '),
          content = (line.length > 0 ? line.substr(1) : line),
          delimiter = hunk.linedelimiters[j];

      if (operation === ' ') {
        toPos++;
      } else if (operation === '-') {
        lines.splice(toPos, 1);
        delimiters.splice(toPos, 1);
      /* istanbul ignore else */
      } else if (operation === '+') {
        lines.splice(toPos, 0, content);
        delimiters.splice(toPos, 0, delimiter);
        toPos++;
      } else if (operation === '\\') {
        let previousOperation: number = hunk.lines[j - 1] ? hunk.lines[j - 1][0] : null;
        if (previousOperation === '+') {
          removeEOFNL = true;
        } else if (previousOperation === '-') {
          addEOFNL = true;
        }
      }
    }
  }

  // Handle EOFNL insertion/removal
  if (removeEOFNL) {
    while (!lines[lines.length - 1]) {
      lines.pop();
      delimiters.pop();
    }
  } else if (addEOFNL) {
    lines.push('');
    delimiters.push('\n');
  }
  for (let _k = 0; _k < lines.length - 1; _k++) {
    lines[_k] = lines[_k] + delimiters[_k];
  }
  return lines.join('');
}

// Wrapper that supports multiple file patches via callbacks.
export function applyPatches(uniDiff: any, options: any): void {
  if (typeof uniDiff === 'string') {
    uniDiff = parsePatch(uniDiff);
  }

  let currentIndex: number = 0;
  function processIndex(): string {
    let index: number = uniDiff[currentIndex++];
    if (!index) {
      return options.complete();
    }

    options.loadFile(index, function(err: any, data: any) {
      if (err) {
        return options.complete(err);
      }

      let updatedContent: any = applyPatch(data, index, options);
      options.patched(index, updatedContent, function(err: any) {
        if (err) {
          return options.complete(err);
        }

        processIndex();
      });
    });
  }
  processIndex();
}
