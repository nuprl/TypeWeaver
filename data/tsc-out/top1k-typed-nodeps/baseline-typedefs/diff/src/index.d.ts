import Diff from "./diff/base";
import { diffChars } from "./diff/character";
import { diffWords } from "./diff/word";
import { diffWordsWithSpace } from "./diff/word";
import { diffLines } from "./diff/line";
import { diffTrimmedLines } from "./diff/line";
import { diffSentences } from "./diff/sentence";
import { diffCss } from "./diff/css";
import { diffJson } from "./diff/json";
import { diffArrays } from "./diff/array";
import { structuredPatch } from "./patch/create";
import { createTwoFilesPatch } from "./patch/create";
import { createPatch } from "./patch/create";
import { applyPatch } from "./patch/apply";
import { applyPatches } from "./patch/apply";
import { parsePatch } from "./patch/parse";
import { merge } from "./patch/merge";
import { convertChangesToDMP } from "./convert/dmp";
import { convertChangesToXML } from "./convert/xml";
import { canonicalize } from "./diff/json";
export { Diff, diffChars, diffWords, diffWordsWithSpace, diffLines, diffTrimmedLines, diffSentences, diffCss, diffJson, diffArrays, structuredPatch, createTwoFilesPatch, createPatch, applyPatch, applyPatches, parsePatch, merge, convertChangesToDMP, convertChangesToXML, canonicalize };
