/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import streamChunksOfSourceMap from './streamChunksOfSourceMap';
import splitIntoLines from './splitIntoLines';

const streamChunksOfCombinedSourceMap: Function = (
	source: String,
	sourceMap: SourceMapSource,
	innerSourceName: String,
	innerSource: String,
	innerSourceMap: String,
	removeInnerSource: SourceMapSource,
	onChunk: Object,
	onSource: Function,
	onName: Function,
	finalSource: String,
	columns: String
) => {
	let sourceMapping: Map = new Map();
	let nameMapping: Map = new Map();
	const sourceIndexMapping: Array = [];
	const nameIndexMapping: String = [];
	const nameIndexValueMapping: Function = [];
	let innerSourceIndex: Number = -2;
	const innerSourceIndexMapping: String = [];
	const innerSourceIndexValueMapping: Function = [];
	const innerSourceContents: Array = [];
	const innerSourceContentLines: Array = [];
	const innerNameIndexMapping: Function = [];
	const innerNameIndexValueMapping: Function = [];
	const innerSourceMapLineData: Array = [];
	const findInnerMapping: Function = (line: Number, column: Number) => {
		if (line > innerSourceMapLineData.length) return -1;
		const { mappingsData } = innerSourceMapLineData[line - 1];
		let l: Number = 0;
		let r: Number = mappingsData.length / 5;
		while (l < r) {
			let m: Number = (l + r) >> 1;
			if (mappingsData[m * 5] <= column) {
				l = m + 1;
			} else {
				r = m;
			}
		}
		if (l === 0) return -1;
		return l - 1;
	};
	return streamChunksOfSourceMap(
		source,
		sourceMap,
		(
			chunk: String,
			generatedLine: String,
			generatedColumn: String,
			sourceIndex: Number,
			originalLine: Number,
			originalColumn: Number,
			nameIndex: Number
		) => {
			// Check if this is a mapping to the inner source
			if (sourceIndex === innerSourceIndex) {
				// Check if there is a mapping in the inner source
				const idx: Number = findInnerMapping(originalLine, originalColumn);
				if (idx !== -1) {
					const { chunks, mappingsData } = innerSourceMapLineData[
						originalLine - 1
					];
					const mi: Number = idx * 5;
					const innerSourceIndex: String = mappingsData[mi + 1];
					const innerOriginalLine: Number = mappingsData[mi + 2];
					let innerOriginalColumn: String = mappingsData[mi + 3];
					let innerNameIndex: String = mappingsData[mi + 4];
					if (innerSourceIndex >= 0) {
						// Check for an identity mapping
						// where we are allowed to adjust the original column
						const innerChunk: Array = chunks[idx];
						const innerGeneratedColumn: Number = mappingsData[mi];
						const locationInChunk: Number = originalColumn - innerGeneratedColumn;
						if (locationInChunk > 0) {
							let originalSourceLines: Array =
								innerSourceIndex < innerSourceContentLines.length
									? innerSourceContentLines[innerSourceIndex]
									: null;
							if (originalSourceLines === undefined) {
								const originalSource: Source = innerSourceContents[innerSourceIndex];
								originalSourceLines = originalSource
									? splitIntoLines(originalSource)
									: null;
								innerSourceContentLines[innerSourceIndex] = originalSourceLines;
							}
							if (originalSourceLines !== null) {
								const originalChunk: String =
									innerOriginalLine <= originalSourceLines.length
										? originalSourceLines[innerOriginalLine - 1].slice(
												innerOriginalColumn,
												innerOriginalColumn + locationInChunk
										  )
										: "";
								if (innerChunk.slice(0, locationInChunk) === originalChunk) {
									innerOriginalColumn += locationInChunk;
									innerNameIndex = -1;
								}
							}
						}

						// We have a inner mapping to original source

						// emit source when needed and compute global source index
						let sourceIndex: Number =
							innerSourceIndex < innerSourceIndexMapping.length
								? innerSourceIndexMapping[innerSourceIndex]
								: -2;
						if (sourceIndex === -2) {
							const [source, sourceContent] =
								innerSourceIndex < innerSourceIndexValueMapping.length
									? innerSourceIndexValueMapping[innerSourceIndex]
									: [null, undefined];
							let globalIndex: Number = sourceMapping.get(source);
							if (globalIndex === undefined) {
								sourceMapping.set(source, (globalIndex = sourceMapping.size));
								onSource(globalIndex, source, sourceContent);
							}
							sourceIndex = globalIndex;
							innerSourceIndexMapping[innerSourceIndex] = sourceIndex;
						}

						// emit name when needed and compute global name index
						let finalNameIndex: Number = -1;
						if (innerNameIndex >= 0) {
							// when we have a inner name
							finalNameIndex =
								innerNameIndex < innerNameIndexMapping.length
									? innerNameIndexMapping[innerNameIndex]
									: -2;
							if (finalNameIndex === -2) {
								const name: String =
									innerNameIndex < innerNameIndexValueMapping.length
										? innerNameIndexValueMapping[innerNameIndex]
										: undefined;
								if (name) {
									let globalIndex: Number = nameMapping.get(name);
									if (globalIndex === undefined) {
										nameMapping.set(name, (globalIndex = nameMapping.size));
										onName(globalIndex, name);
									}
									finalNameIndex = globalIndex;
								} else {
									finalNameIndex = -1;
								}
								innerNameIndexMapping[innerNameIndex] = finalNameIndex;
							}
						} else if (nameIndex >= 0) {
							// when we don't have an inner name,
							// but we have an outer name
							// it can be used when inner original code equals to the name
							let originalSourceLines: Array =
								innerSourceContentLines[innerSourceIndex];
							if (originalSourceLines === undefined) {
								const originalSource: Source = innerSourceContents[innerSourceIndex];
								originalSourceLines = originalSource
									? splitIntoLines(originalSource)
									: null;
								innerSourceContentLines[innerSourceIndex] = originalSourceLines;
							}
							if (originalSourceLines !== null) {
								const name: String = nameIndexValueMapping[nameIndex];
								const originalName: String =
									innerOriginalLine <= originalSourceLines.length
										? originalSourceLines[innerOriginalLine - 1].slice(
												innerOriginalColumn,
												innerOriginalColumn + name.length
										  )
										: "";
								if (name === originalName) {
									finalNameIndex =
										nameIndex < nameIndexMapping.length
											? nameIndexMapping[nameIndex]
											: -2;
									if (finalNameIndex === -2) {
										const name: String = nameIndexValueMapping[nameIndex];
										if (name) {
											let globalIndex: Number = nameMapping.get(name);
											if (globalIndex === undefined) {
												nameMapping.set(name, (globalIndex = nameMapping.size));
												onName(globalIndex, name);
											}
											finalNameIndex = globalIndex;
										} else {
											finalNameIndex = -1;
										}
										nameIndexMapping[nameIndex] = finalNameIndex;
									}
								}
							}
						}
						onChunk(
							chunk,
							generatedLine,
							generatedColumn,
							sourceIndex,
							innerOriginalLine,
							innerOriginalColumn,
							finalNameIndex
						);
						return;
					}
				}

				// We have a mapping to the inner source, but no inner mapping
				if (removeInnerSource) {
					onChunk(chunk, generatedLine, generatedColumn, -1, -1, -1, -1);
					return;
				} else {
					if (sourceIndexMapping[sourceIndex] === -2) {
						let globalIndex: String = sourceMapping.get(innerSourceName);
						if (globalIndex === undefined) {
							sourceMapping.set(source, (globalIndex = sourceMapping.size));
							onSource(globalIndex, innerSourceName, innerSource);
						}
						sourceIndexMapping[sourceIndex] = globalIndex;
					}
				}
			}

			const finalSourceIndex: Number =
				sourceIndex < 0 || sourceIndex >= sourceIndexMapping.length
					? -1
					: sourceIndexMapping[sourceIndex];
			if (finalSourceIndex < 0) {
				// no source, so we make it a generated chunk
				onChunk(chunk, generatedLine, generatedColumn, -1, -1, -1, -1);
			} else {
				// Pass through the chunk with mapping
				let finalNameIndex: String = -1;
				if (nameIndex >= 0 && nameIndex < nameIndexMapping.length) {
					finalNameIndex = nameIndexMapping[nameIndex];
					if (finalNameIndex === -2) {
						const name: String = nameIndexValueMapping[nameIndex];
						let globalIndex: Number = nameMapping.get(name);
						if (globalIndex === undefined) {
							nameMapping.set(name, (globalIndex = nameMapping.size));
							onName(globalIndex, name);
						}
						finalNameIndex = globalIndex;
						nameIndexMapping[nameIndex] = finalNameIndex;
					}
				}
				onChunk(
					chunk,
					generatedLine,
					generatedColumn,
					finalSourceIndex,
					originalLine,
					originalColumn,
					finalNameIndex
				);
			}
		},
		(i: Number, source: String, sourceContent: String) => {
			if (source === innerSourceName) {
				innerSourceIndex = i;
				if (innerSource !== undefined) sourceContent = innerSource;
				else innerSource = sourceContent;
				sourceIndexMapping[i] = -2;
				streamChunksOfSourceMap(
					sourceContent,
					innerSourceMap,
					(
						chunk: String,
						generatedLine: Number,
						generatedColumn: String,
						sourceIndex: String,
						originalLine: OriginalSource,
						originalColumn: String,
						nameIndex: String
					) => {
						while (innerSourceMapLineData.length < generatedLine) {
							innerSourceMapLineData.push({
								mappingsData: [],
								chunks: []
							});
						}
						const data: Object = innerSourceMapLineData[generatedLine - 1];
						data.mappingsData.push(
							generatedColumn,
							sourceIndex,
							originalLine,
							originalColumn,
							nameIndex
						);
						data.chunks.push(chunk);
					},
					(i: String, source: String, sourceContent: String) => {
						innerSourceContents[i] = sourceContent;
						innerSourceContentLines[i] = undefined;
						innerSourceIndexMapping[i] = -2;
						innerSourceIndexValueMapping[i] = [source, sourceContent];
					},
					(i: String, name: String) => {
						innerNameIndexMapping[i] = -2;
						innerNameIndexValueMapping[i] = name;
					},
					false,
					columns
				);
			} else {
				let globalIndex: String = sourceMapping.get(source);
				if (globalIndex === undefined) {
					sourceMapping.set(source, (globalIndex = sourceMapping.size));
					onSource(globalIndex, source, sourceContent);
				}
				sourceIndexMapping[i] = globalIndex;
			}
		},
		(i: String, name: String) => {
			nameIndexMapping[i] = -2;
			nameIndexValueMapping[i] = name;
		},
		finalSource,
		columns
	);
};

export default streamChunksOfCombinedSourceMap;
