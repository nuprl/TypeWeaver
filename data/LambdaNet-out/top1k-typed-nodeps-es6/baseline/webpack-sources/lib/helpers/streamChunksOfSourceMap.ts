/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import getGeneratedSourceInfo from './getGeneratedSourceInfo';
import getSource from './getSource';
import readMappings from './readMappings';
import splitIntoLines from './splitIntoLines';

const streamChunksOfSourceMapFull: Function = (
	source: String,
	sourceMap: CachedSource,
	onChunk: Object,
	onSource: Function,
	onName: Function
) => {
	const lines: Array = splitIntoLines(source);
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

	const lastLine: Array = lines[lines.length - 1];
	const lastNewLine: Boolean = lastLine.endsWith("\n");
	const finalLine: Number = lastNewLine ? lines.length + 1 : lines.length;
	const finalColumn: Number = lastNewLine ? 0 : lastLine.length;

	let currentGeneratedLine: Number = 1;
	let currentGeneratedColumn: Number = 0;

	let mappingActive: Boolean = false;
	let activeMappingSourceIndex: Number = -1;
	let activeMappingOriginalLine: Number = -1;
	let activeMappingOriginalColumn: Number = -1;
	let activeMappingNameIndex: String = -1;

	const onMapping: Function = (
		generatedLine: Number,
		generatedColumn: Boolean,
		sourceIndex: Number,
		originalLine: Number,
		originalColumn: Number,
		nameIndex: Number
	) => {
		if (mappingActive && currentGeneratedLine <= lines.length) {
			let chunk: Array;
			const mappingLine: Number = currentGeneratedLine;
			const mappingColumn: Number = currentGeneratedColumn;
			const line: Array = lines[currentGeneratedLine - 1];
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
				const chunk: Array = lines[currentGeneratedLine - 1].slice(
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
				const chunk: Array = lines[currentGeneratedLine - 1].slice(
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

const streamChunksOfSourceMapLinesFull: Function = (
	source: String,
	sourceMap: SourceMapSource,
	onChunk: Object,
	onSource: Function,
	_onName: String
) => {
	const lines: Array = splitIntoLines(source);
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

	let currentGeneratedLine: Number = 1;

	const onMapping: Function = (
		generatedLine: Number,
		_generatedColumn: Number,
		sourceIndex: String,
		originalLine: OriginalSource,
		originalColumn: OriginalSource,
		_nameIndex: String
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

	const lastLine: Array = lines[lines.length - 1];
	const lastNewLine: Boolean = lastLine.endsWith("\n");

	const finalLine: Number = lastNewLine ? lines.length + 1 : lines.length;
	const finalColumn: Number = lastNewLine ? 0 : lastLine.length;

	return {
		generatedLine: finalLine,
		generatedColumn: finalColumn
	};
};

const streamChunksOfSourceMapFinal: Function = (
	source: String,
	sourceMap: CachedSource,
	onChunk: Function,
	onSource: Function,
	onName: Function
) => {
	const result: Object = getGeneratedSourceInfo(source);
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

	let mappingActiveLine: Number = 0;

	const onMapping: Function = (
		generatedLine: Boolean,
		generatedColumn: Number,
		sourceIndex: Number,
		originalLine: OriginalSource,
		originalColumn: OriginalSource,
		nameIndex: String
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

const streamChunksOfSourceMapLinesFinal: Function = (
	source: String,
	sourceMap: SourceMapSource,
	onChunk: Function,
	onSource: Function,
	_onName: String
) => {
	const result: Object = getGeneratedSourceInfo(source);
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

	const finalLine: Number = generatedColumn === 0 ? generatedLine - 1 : generatedLine;

	let currentGeneratedLine: Number = 1;

	const onMapping: Function = (
		generatedLine: Number,
		_generatedColumn: Number,
		sourceIndex: Number,
		originalLine: OriginalSource,
		originalColumn: OriginalSource,
		_nameIndex: String
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

export default (
	source: String,
	sourceMap: SourceMapSource,
	onChunk: String,
	onSource: String,
	onName: String,
	finalSource: CachedSource,
	columns: Boolean
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
