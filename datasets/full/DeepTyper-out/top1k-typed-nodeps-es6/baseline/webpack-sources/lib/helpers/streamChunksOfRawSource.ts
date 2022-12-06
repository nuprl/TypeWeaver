/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import getGeneratedSourceInfo from './getGeneratedSourceInfo';
import splitIntoLines from './splitIntoLines';

const streamChunksOfRawSource: number = (source: string, onChunk: number, onSource: number, onName: number) => {
	let line: number = 1;
	const matches: any = splitIntoLines(source);
	let match: any;
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

export default (source: any, onChunk: any, onSource: number, onName: number, finalSource: number) => {
	return finalSource
		? getGeneratedSourceInfo(source)
		: streamChunksOfRawSource(source, onChunk, onSource, onName);
};
