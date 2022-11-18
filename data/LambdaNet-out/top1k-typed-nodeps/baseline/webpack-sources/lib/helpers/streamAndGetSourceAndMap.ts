/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const createMappingsSerializer: Function = require("./createMappingsSerializer");
const streamChunks: object = require("./streamChunks");

const streamAndGetSourceAndMap: Function = (
	inputSource: string,
	options: object,
	onChunk: Function,
	onSource: Function,
	onName: Function
) => {
	let code: string = "";
	let mappings: string = "";
	let sources: any[] = [];
	let sourcesContent: any[] = [];
	let names: any[] = [];
	const addMapping: Function = createMappingsSerializer(
		Object.assign({}, options, { columns: true })
	);
	const finalSource: Source = !!(options && options.finalSource);
	const { generatedLine, generatedColumn, source } = streamChunks(
		inputSource,
		options,
		(
			chunk: number,
			generatedLine: number,
			generatedColumn: string,
			sourceIndex: string,
			originalLine: OriginalSource,
			originalColumn: string,
			nameIndex: string
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
		(sourceIndex: string, source: string, sourceContent: string) => {
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
		(nameIndex: string, name: string) => {
			while (names.length < nameIndex) {
				names.push(null);
			}
			names[nameIndex] = name;
			return onName(nameIndex, name);
		}
	);
	const resultSource: string = source !== undefined ? source : code;
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

module.exports = streamAndGetSourceAndMap;
