/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import createMappingsSerializer from './createMappingsSerializer';
import streamChunks from './streamChunks';

const streamAndGetSourceAndMap: Function = (
	inputSource: String,
	options: Object,
	onChunk: Function,
	onSource: Function,
	onName: Function
) => {
	let code: String = "";
	let mappings: String = "";
	let sources: Array = [];
	let sourcesContent: Array = [];
	let names: Array = [];
	const addMapping: Function = createMappingsSerializer(
		Object.assign({}, options, { columns: true })
	);
	const finalSource: PrefixSource = !!(options && options.finalSource);
	const { generatedLine, generatedColumn, source } = streamChunks(
		inputSource,
		options,
		(
			chunk: Number,
			generatedLine: Number,
			generatedColumn: String,
			sourceIndex: String,
			originalLine: OriginalSource,
			originalColumn: String,
			nameIndex: String
		) => {
			if (chunk !== undefined) code += chunk;
			mappings += addMapping(
				generatedLine,
				generatedColumn,
				sourceIndex,
				originalLine,
				originalColumn,
				nameIndex
			);
			return onChunk(
				finalSource ? undefined : chunk,
				generatedLine,
				generatedColumn,
				sourceIndex,
				originalLine,
				originalColumn,
				nameIndex
			);
		},
		(sourceIndex: String, source: String, sourceContent: String) => {
			while (sources.length < sourceIndex) {
				sources.push(null);
			}
			sources[sourceIndex] = source;
			if (sourceContent !== undefined) {
				while (sourcesContent.length < sourceIndex) {
					sourcesContent.push(null);
				}
				sourcesContent[sourceIndex] = sourceContent;
			}
			return onSource(sourceIndex, source, sourceContent);
		},
		(nameIndex: String, name: String) => {
			while (names.length < nameIndex) {
				names.push(null);
			}
			names[nameIndex] = name;
			return onName(nameIndex, name);
		}
	);
	const resultSource: String = source !== undefined ? source : code;
	return {
		result: {
			generatedLine,
			generatedColumn,
			source: finalSource ? resultSource : undefined
		},
		source: resultSource,
		map:
			mappings.length > 0
				? {
						version: 3,
						file: "x",
						mappings,
						sources,
						sourcesContent:
							sourcesContent.length > 0 ? sourcesContent : undefined,
						names
				  }
				: null
	};
};

export default streamAndGetSourceAndMap;
