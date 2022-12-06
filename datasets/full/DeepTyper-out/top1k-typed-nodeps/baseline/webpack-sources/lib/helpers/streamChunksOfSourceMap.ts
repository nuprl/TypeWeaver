/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const getGeneratedSourceInfo: any = require("./getGeneratedSourceInfo");
const getSource: any = require("./getSource");
const readMappings: any = require("./readMappings");
const splitIntoLines: any = require("./splitIntoLines");

const streamChunksOfSourceMapFull: any = (
	source: any,
	sourceMap: any,
	onChunk: any,
	onSource: number,
	onName: number
) => {
	const lines: string[] = splitIntoLines(source);
	if (lines.length === 0) {
		return {
			generatedLine: 1,
			generatedColumn: 0
		};
	}
	const { sources, sourcesContent, names, mappings } = sourceMap;
	for (let i = 0; i < sources.length; i++) {
		onSource(
			i,
			getSource(sourceMap, i),
			(sourcesContent && sourcesContent[i]) || undefined
		);
	}
	if (names) {
		for (let i = 0; i < names.length; i++) {
			onName(i, names[i]);
		}
	}

	const lastLine: number = lines[lines.length - 1];
	const lastNewLine: number = lastLine.endsWith("\n");
	const finalLine: number = lastNewLine ? lines.length + 1 : lines.length;
	const finalColumn: number = lastNewLine ? 0 : lastLine.length;

	let currentGeneratedLine: number = 1;
	let currentGeneratedColumn: number = 0;

	let mappingActive: boolean = false;
	let activeMappingSourceIndex: number = -1;
	let activeMappingOriginalLine: number = -1;
	let activeMappingOriginalColumn: number = -1;
	let activeMappingNameIndex: number = -1;

	const onMapping: boolean = (
		generatedLine: string,
		generatedColumn: number,
		sourceIndex: number,
		originalLine: any,
		originalColumn: any,
		nameIndex: number
	) => {
		if (mappingActive && currentGeneratedLine <= lines.length) {
			let chunk: any;
			const mappingLine: number = currentGeneratedLine;
			const mappingColumn: number = currentGeneratedColumn;
			const line: any = lines[currentGeneratedLine - 1];
			if (generatedLine !== currentGeneratedLine) {
				chunk = line.slice(currentGeneratedColumn);
				currentGeneratedLine++;
				currentGeneratedColumn = 0;
			} else {
				chunk = line.slice(currentGeneratedColumn, generatedColumn);
				currentGeneratedColumn = generatedColumn;
			}
			if (chunk) {
				onChunk(
					chunk,
					mappingLine,
					mappingColumn,
					activeMappingSourceIndex,
					activeMappingOriginalLine,
					activeMappingOriginalColumn,
					activeMappingNameIndex
				);
			}
			mappingActive = false;
		}
		if (generatedLine > currentGeneratedLine && currentGeneratedColumn > 0) {
			if (currentGeneratedLine <= lines.length) {
				const chunk: any = lines[currentGeneratedLine - 1].slice(
					currentGeneratedColumn
				);
				onChunk(
					chunk,
					currentGeneratedLine,
					currentGeneratedColumn,
					-1,
					-1,
					-1,
					-1
				);
			}
			currentGeneratedLine++;
			currentGeneratedColumn = 0;
		}
		while (generatedLine > currentGeneratedLine) {
			if (currentGeneratedLine <= lines.length) {
				onChunk(
					lines[currentGeneratedLine - 1],
					currentGeneratedLine,
					0,
					-1,
					-1,
					-1,
					-1
				);
			}
			currentGeneratedLine++;
		}
		if (generatedColumn > currentGeneratedColumn) {
			if (currentGeneratedLine <= lines.length) {
				const chunk: any = lines[currentGeneratedLine - 1].slice(
					currentGeneratedColumn,
					generatedColumn
				);
				onChunk(
					chunk,
					currentGeneratedLine,
					currentGeneratedColumn,
					-1,
					-1,
					-1,
					-1
				);
			}
			currentGeneratedColumn = generatedColumn;
		}
		if (
			sourceIndex >= 0 &&
			(generatedLine < finalLine ||
				(generatedLine === finalLine && generatedColumn < finalColumn))
		) {
			mappingActive = true;
			activeMappingSourceIndex = sourceIndex;
			activeMappingOriginalLine = originalLine;
			activeMappingOriginalColumn = originalColumn;
			activeMappingNameIndex = nameIndex;
		}
	};
	readMappings(mappings, onMapping);
	onMapping(finalLine, finalColumn, -1, -1, -1, -1);
	return {
		generatedLine: finalLine,
		generatedColumn: finalColumn
	};
};

const streamChunksOfSourceMapLinesFull: any = (
	source: any,
	sourceMap: any,
	onChunk: any,
	onSource: number,
	_onName: number
) => {
	const lines: string[] = splitIntoLines(source);
	if (lines.length === 0) {
		return {
			generatedLine: 1,
			generatedColumn: 0
		};
	}
	const { sources, sourcesContent, mappings } = sourceMap;
	for (let i = 0; i < sources.length; i++) {
		onSource(
			i,
			getSource(sourceMap, i),
			(sourcesContent && sourcesContent[i]) || undefined
		);
	}

	let currentGeneratedLine: number = 1;

	const onMapping: void = (
		generatedLine: string,
		_generatedColumn: number,
		sourceIndex: number,
		originalLine: any,
		originalColumn: any,
		_nameIndex: number
	) => {
		if (
			sourceIndex < 0 ||
			generatedLine < currentGeneratedLine ||
			generatedLine > lines.length
		) {
			return;
		}
		while (generatedLine > currentGeneratedLine) {
			if (currentGeneratedLine <= lines.length) {
				onChunk(
					lines[currentGeneratedLine - 1],
					currentGeneratedLine,
					0,
					-1,
					-1,
					-1,
					-1
				);
			}
			currentGeneratedLine++;
		}
		if (generatedLine <= lines.length) {
			onChunk(
				lines[generatedLine - 1],
				generatedLine,
				0,
				sourceIndex,
				originalLine,
				originalColumn,
				-1
			);
			currentGeneratedLine++;
		}
	};
	readMappings(mappings, onMapping);
	for (; currentGeneratedLine <= lines.length; currentGeneratedLine++) {
		onChunk(
			lines[currentGeneratedLine - 1],
			currentGeneratedLine,
			0,
			-1,
			-1,
			-1,
			-1
		);
	}

	const lastLine: number = lines[lines.length - 1];
	const lastNewLine: number = lastLine.endsWith("\n");

	const finalLine: number = lastNewLine ? lines.length + 1 : lines.length;
	const finalColumn: number = lastNewLine ? 0 : lastLine.length;

	return {
		generatedLine: finalLine,
		generatedColumn: finalColumn
	};
};

const streamChunksOfSourceMapFinal: any = (
	source: any,
	sourceMap: any,
	onChunk: number,
	onSource: number,
	onName: number
) => {
	const result: any = getGeneratedSourceInfo(source);
	const { generatedLine: finalLine, generatedColumn: finalColumn } = result;

	if (finalLine === 1 && finalColumn === 0) return result;
	const { sources, sourcesContent, names, mappings } = sourceMap;
	for (let i = 0; i < sources.length; i++) {
		onSource(
			i,
			getSource(sourceMap, i),
			(sourcesContent && sourcesContent[i]) || undefined
		);
	}
	if (names) {
		for (let i = 0; i < names.length; i++) {
			onName(i, names[i]);
		}
	}

	let mappingActiveLine: number = 0;

	const onMapping: any = (
		generatedLine: string,
		generatedColumn: number,
		sourceIndex: number,
		originalLine: any,
		originalColumn: any,
		nameIndex: number
	) => {
		if (
			generatedLine >= finalLine &&
			(generatedColumn >= finalColumn || generatedLine > finalLine)
		) {
			return;
		}
		if (sourceIndex >= 0) {
			onChunk(
				undefined,
				generatedLine,
				generatedColumn,
				sourceIndex,
				originalLine,
				originalColumn,
				nameIndex
			);
			mappingActiveLine = generatedLine;
		} else if (mappingActiveLine === generatedLine) {
			onChunk(undefined, generatedLine, generatedColumn, -1, -1, -1, -1);
			mappingActiveLine = 0;
		}
	};
	readMappings(mappings, onMapping);
	return result;
};

const streamChunksOfSourceMapLinesFinal: number = (
	source: any,
	sourceMap: any,
	onChunk: any,
	onSource: number,
	_onName: number
) => {
	const result: any = getGeneratedSourceInfo(source);
	const { generatedLine, generatedColumn } = result;
	if (generatedLine === 1 && generatedColumn === 0) {
		return {
			generatedLine: 1,
			generatedColumn: 0
		};
	}

	const { sources, sourcesContent, mappings } = sourceMap;
	for (let i = 0; i < sources.length; i++) {
		onSource(
			i,
			getSource(sourceMap, i),
			(sourcesContent && sourcesContent[i]) || undefined
		);
	}

	const finalLine: number = generatedColumn === 0 ? generatedLine - 1 : generatedLine;

	let currentGeneratedLine: number = 1;

	const onMapping: number = (
		generatedLine: string,
		_generatedColumn: number,
		sourceIndex: number,
		originalLine: number,
		originalColumn: any,
		_nameIndex: number
	) => {
		if (
			sourceIndex >= 0 &&
			currentGeneratedLine <= generatedLine &&
			generatedLine <= finalLine
		) {
			onChunk(
				undefined,
				generatedLine,
				0,
				sourceIndex,
				originalLine,
				originalColumn,
				-1
			);
			currentGeneratedLine = generatedLine + 1;
		}
	};
	readMappings(mappings, onMapping);
	return result;
};

module.exports = (
	source: any,
	sourceMap: any,
	onChunk: any,
	onSource: any,
	onName: number,
	finalSource: number,
	columns: any
) => {
	if (columns) {
		return finalSource
			? streamChunksOfSourceMapFinal(
					source,
					sourceMap,
					onChunk,
					onSource,
					onName
			  )
			: streamChunksOfSourceMapFull(
					source,
					sourceMap,
					onChunk,
					onSource,
					onName
			  );
	} else {
		return finalSource
			? streamChunksOfSourceMapLinesFinal(
					source,
					sourceMap,
					onChunk,
					onSource,
					onName
			  )
			: streamChunksOfSourceMapLinesFull(
					source,
					sourceMap,
					onChunk,
					onSource,
					onName
			  );
	}
};
