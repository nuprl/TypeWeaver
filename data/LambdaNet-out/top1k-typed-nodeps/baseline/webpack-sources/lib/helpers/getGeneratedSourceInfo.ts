/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const CHAR_CODE_NEW_LINE: Number = "\n".charCodeAt(0);

const getGeneratedSourceInfo: Function = (source: String) => {
	if (source === undefined) {
		return {};
	}
	const lastLineStart: Number = source.lastIndexOf("\n");
	if (lastLineStart === -1) {
		return {
			generatedLine: 1,
			generatedColumn: source.length,
			source
		};
	}
	let generatedLine: Number = 2;
	for (let i = 0; i < lastLineStart; i++) {
		if (source.charCodeAt(i) === CHAR_CODE_NEW_LINE) generatedLine++;
	}
	return {
		generatedLine,
		generatedColumn: source.length - lastLineStart - 1,
		source
	};
};

module.exports = getGeneratedSourceInfo;
