/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const createMappingsSerializer: Function = require("./createMappingsSerializer");

exports.getSourceAndMap = (inputSource: OriginalSource, options: Object) => {
	let code: String = "";
	let mappings: String = "";
	let sources: Array = [];
	let sourcesContent: Array = [];
	let names: Array = [];
	const addMapping: Function = createMappingsSerializer(options);
	const { source } = inputSource.streamChunks(
		Object.assign({}, options, { finalSource: true }),
		(
			chunk: Number,
			generatedLine: Array,
			generatedColumn: Number,
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
		},
		(nameIndex: String, name: String) => {
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

exports.getMap = (source: OriginalSource, options: Object) => {
	let mappings: String = "";
	let sources: Array = [];
	let sourcesContent: Array = [];
	let names: Array = [];
	const addMapping: Function = createMappingsSerializer(options);
	source.streamChunks(
		Object.assign({}, options, { source: false, finalSource: true }),
		(
			chunk: Function,
			generatedLine: Array,
			generatedColumn: Number,
			sourceIndex: String,
			originalLine: OriginalSource,
			originalColumn: String,
			nameIndex: String
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
		},
		(nameIndex: String, name: String) => {
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
