/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import getGeneratedSourceInfo from './getGeneratedSourceInfo';
import splitIntoLines from './splitIntoLines';

const streamChunksOfRawSource: Function = (source: String, onChunk: Function, onSource: String, onName: String) => {
	let line: Number = 1;
	const matches: Array = splitIntoLines(source);
	let match: Array;
	for (match of matches) {
		onChunk(match, line, 0, -1, -1, -1, -1);
		line++;
	}
	return matches.length === 0 || match.endsWith("\n")
		? {
				generatedLine: matches.length + 1,
				generatedColumn: 0
		  }
		: {
				generatedLine: matches.length,
				generatedColumn: match.length
		  };
};

export default (source: String, onChunk: String, onSource: String, onName: String, finalSource: Source) => {
	return finalSource
		? getGeneratedSourceInfo(source)
		: streamChunksOfRawSource(source, onChunk, onSource, onName);
};
