/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const getName: Function = (sourceMap: SourceMapSource, index: number) => {
	if (index < 0) return null;
	const { names } = sourceMap;
	return names[index];
};

module.exports = getName;
