/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import streamChunksOfRawSource from './streamChunksOfRawSource';
import streamChunksOfSourceMap from './streamChunksOfSourceMap';

export default (source, options, onChunk, onSource, onName) => {
	if (typeof source.streamChunks === "function") {
		return source.streamChunks(options, onChunk, onSource, onName);
	} else {
		const sourceAndMap = source.sourceAndMap(options);
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