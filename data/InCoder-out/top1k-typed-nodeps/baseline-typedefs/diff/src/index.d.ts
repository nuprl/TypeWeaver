import Diff from './diff/base';
import { diffChars } from './diff/character';
import { diffWords, diffWordsWithSpace } from './diff/word';
import { diffLines, diffTrimmedLines } from './diff/line';
import { diffSentences } from './diff/sentence';
import { diffCss } from './diff/css';
import { diffJson, canonicalize } from './diff/json';
import { diffArrays } from './diff/array';
import { applyPatch, applyPatches } from './patch/apply';
import { parsePatch } from './patch/parse';
import { merge } from './patch/merge';
import { structuredPatch, createTwoFilesPatch, createPatch } from './patch/create';
import { convertChangesToDMP } from './convert/dmp';
import { convertChangesToXML } from './convert/xml';
export { Diff, diffChars, diffWords, diffWordsWithSpace, diffLines, diffTrimmedLines, diffSentences, diffCss, diffJson, diffArrays, structuredPatch, createTwoFilesPatch, createPatch, applyPatch, applyPatches, parsePatch, merge, convertChangesToDMP, convertChangesToXML, canonicalize };
