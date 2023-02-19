/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const createMappingsSerializer: Function = require("./createMappingsSerializer");

exports.getSourceAndMap = (inputSource: OriginalSource, options: object) => {
	let code: string = "";
	let mappings: string = "";
	let sources: any[] = [];
	let sourcesContent: any[] = [];
	let names: any[] = [];
	const addMapping: Function = createMappingsSerializer(options);
	const { source } = inputSource.streamChunks(
		Object.assign({}, options, { finalSource: true }),
		(
			chunk: number,
			generatedLine: any[],
			generatedColumn: number,
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
		},
		(nameIndex: string, name: string) => {
			while (names.length < nameIndex) {
				names.push(null);
			}
			names[nameIndex] = name;
		}
	);
	return {
		source: source !== undefined ? source : code,
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

exports.getMap = (source: OriginalSource, options: object) => {
	let mappings: string = "";
	let sources: any[] = [];
	let sourcesContent: any[] = [];
	let names: any[] = [];
	const addMapping: Function = createMappingsSerializer(options);
	source.streamChunks(
		Object.assign({}, options, { source: false, finalSource: true }),
		(
			chunk: Function,
			generatedLine: any[],
			generatedColumn: number,
			sourceIndex: string,
			originalLine: OriginalSource,
			originalColumn: string,
			nameIndex: string
		) => {
			mappings += addMapping(
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
		},
		(nameIndex: string, name: string) => {
			while (names.length < nameIndex) {
				names.push(null);
			}
			names[nameIndex] = name;
		}
	);
	return mappings.length > 0
		? {
				version: 3,
				file: "x",
				mappings,
				sources,
				sourcesContent: sourcesContent.length > 0 ? sourcesContent : undefined,
				names
		  }
		: null;
};
