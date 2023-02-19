/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const createMappingsSerializer: any = require("./createMappingsSerializer");
const streamChunks: any = require("./streamChunks");

const streamAndGetSourceAndMap: any = (
	inputSource: any,
	options: any,
	onChunk: any,
	onSource: any,
	onName: any
) => {
	let code: string = "";
	let mappings: string = "";
	let sources: any[] = [];
	let sourcesContent: any[] = [];
	let names: any[] = [];
	const addMapping: any = createMappingsSerializer(
		Object.assign({}, options, { columns: true })
	);
	const finalSource: boolean = !!(options && options.finalSource);
	const { generatedLine, generatedColumn, source } = streamChunks(
		inputSource,
		options,
		(
			chunk: any,
			generatedLine: string,
			generatedColumn: any,
			sourceIndex: number,
			originalLine: any,
			originalColumn: any,
			nameIndex: any
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
		(sourceIndex: any, source: any, sourceContent: any) => {
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
		(nameIndex: any, name: string) => {
			while (names.length < nameIndex) {
				names.push(null);
			}
			names[nameIndex] = name;
			return onName(nameIndex, name);
		}
	);
	const resultSource: any = source !== undefined ? source : code;
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
