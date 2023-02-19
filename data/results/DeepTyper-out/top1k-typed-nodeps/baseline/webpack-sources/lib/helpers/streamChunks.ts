/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const streamChunksOfRawSource: any = require("./streamChunksOfRawSource");
const streamChunksOfSourceMap: any = require("./streamChunksOfSourceMap");

module.exports = (source: any, options: any, onChunk: any, onSource: any, onName: any) => {
	if (typeof source.streamChunks === "function") {
		return source.streamChunks(options, onChunk, onSource, onName);
	} else {
		const sourceAndMap: any = source.sourceAndMap(options);
		if (sourceAndMap.map) {
			return streamChunksOfSourceMap(
				sourceAndMap.source,
				sourceAndMap.map,
				onChunk,
				onSource,
				onName,
				!!(options && options.finalSource),
				!!(options && options.columns !== false)
			);
		} else {
			return streamChunksOfRawSource(
				sourceAndMap.source,
				onChunk,
				onSource,
				onName,
				!!(options && options.finalSource)
			);
		}
	}
};
