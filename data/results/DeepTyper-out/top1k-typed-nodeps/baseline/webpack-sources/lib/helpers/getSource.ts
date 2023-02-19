/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const getSource: string = (sourceMap: any, index: number) => {
	if (index < 0) return null;
	const { sourceRoot, sources } = sourceMap;
	const source: string = sources[index];
	if (!sourceRoot) return source;
	if (sourceRoot.endsWith("/")) return sourceRoot + source;
	return sourceRoot + "/" + source;
};

module.exports = getSource;
