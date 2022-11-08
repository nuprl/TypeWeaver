/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const getSource = (sourceMap, index) => {
	if (index < 0) return null;
	const { sourceRoot, sources } = sourceMap;
	const source = sources[index];
	if (!sourceRoot) return source;
	if (sourceRoot.endsWith("/")) return sourceRoot + source;
	return sourceRoot + "/" + source;
};

export default getSource;