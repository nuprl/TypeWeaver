/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

import streamChunksOfSourceMap from './streamChunksOfSourceMap';
import splitIntoLines from './splitIntoLines';

const streamChunksOfCombinedSourceMap: any = (
	source: any,
	sourceMap: any,
	innerSourceName: any,
	innerSource: any,
	innerSourceMap: number,
	removeInnerSource: number,
	onChunk: number,
	onSource: number,
	onName: number,
	finalSource: number,
	columns: number
) => {
	let sourceMapping: any = new Map();
	let nameMapping: any = new Map();
	const sourceIndexMapping: any[] = [];
	const nameIndexMapping: any[] = [];
	const nameIndexValueMapping: any[] = [];
	let innerSourceIndex: number = -2;
	const innerSourceIndexMapping: any[] = [];
	const innerSourceIndexValueMapping: any[] = [];
	const innerSourceContents: any[] = [];
	const innerSourceContentLines: any[] = [];
	const innerNameIndexMapping: any[] = [];
	const innerNameIndexValueMapping: any[] = [];
	const innerSourceMapLineData: any[] = [];
	const findInnerMapping: number = (line: number, column: number) => {
		if (line > innerSourceMapLineData.length) return -1;
		const { mappingsData } = innerSourceMapLineData[line - 1];
		let l: number = 0;
		let r: number = mappingsData.length / 5;
		while (l < r) {
			let m: number = (l + r) >> 1;
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
			chunk: any,
			generatedLine: string,
			generatedColumn: number,
			sourceIndex: number,
			originalLine: any,
			originalColumn: any,
			nameIndex: number
		) => {
			// Check if this is a mapping to the inner source
			if (sourceIndex === innerSourceIndex) {
				// Check if there is a mapping in the inner source
				const idx: number = findInnerMapping(originalLine, originalColumn);
				if (idx !== -1) {
					const { chunks, mappingsData } = innerSourceMapLineData[
						originalLine - 1
					];
					const mi: number = idx * 5;
					const innerSourceIndex: any = mappingsData[mi + 1];
					const innerOriginalLine: any = mappingsData[mi + 2];
					let innerOriginalColumn: any = mappingsData[mi + 3];
					let innerNameIndex: number = mappingsData[mi + 4];
					if (innerSourceIndex >= 0) {
						// Check for an identity mapping
						// where we are allowed to adjust the original column
						const innerChunk: any = chunks[idx];
						const innerGeneratedColumn: any = mappingsData[mi];
						const locationInChunk: number = originalColumn - innerGeneratedColumn;
						if (locationInChunk > 0) {
							let originalSourceLines: number =
								innerSourceIndex < innerSourceContentLines.length
									? innerSourceContentLines[innerSourceIndex]
									: null;
							if (originalSourceLines === undefined) {
								const originalSource: any = innerSourceContents[innerSourceIndex];
								originalSourceLines = originalSource
									? splitIntoLines(originalSource)
									: null;
								innerSourceContentLines[innerSourceIndex] = originalSourceLines;
							}
							if (originalSourceLines !== null) {
								const originalChunk: number =
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
						let sourceIndex: number =
							innerSourceIndex < innerSourceIndexMapping.length
								? innerSourceIndexMapping[innerSourceIndex]
								: -2;
						if (sourceIndex === -2) {
							const [source, sourceContent] =
								innerSourceIndex < innerSourceIndexValueMapping.length
									? innerSourceIndexValueMapping[innerSourceIndex]
									: [null, undefined];
							let globalIndex: any = sourceMapping.get(source);
							if (globalIndex === undefined) {
								sourceMapping.set(source, (globalIndex = sourceMapping.size));
								onSource(globalIndex, source, sourceContent);
							}
							sourceIndex = globalIndex;
							innerSourceIndexMapping[innerSourceIndex] = sourceIndex;
						}

						// emit name when needed and compute global name index
						let finalNameIndex: number = -1;
						if (innerNameIndex >= 0) {
							// when we have a inner name
							finalNameIndex =
								innerNameIndex < innerNameIndexMapping.length
									? innerNameIndexMapping[innerNameIndex]
									: -2;
							if (finalNameIndex === -2) {
								const name: any =
									innerNameIndex < innerNameIndexValueMapping.length
										? innerNameIndexValueMapping[innerNameIndex]
										: undefined;
								if (name) {
									let globalIndex: any = nameMapping.get(name);
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
							let originalSourceLines: any =
								innerSourceContentLines[innerSourceIndex];
							if (originalSourceLines === undefined) {
								const originalSource: any = innerSourceContents[innerSourceIndex];
								originalSourceLines = originalSource
									? splitIntoLines(originalSource)
									: null;
								innerSourceContentLines[innerSourceIndex] = originalSourceLines;
							}
							if (originalSourceLines !== null) {
								const name: any = nameIndexValueMapping[nameIndex];
								const originalName: number =
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
										const name: any = nameIndexValueMapping[nameIndex];
										if (name) {
											let globalIndex: any = nameMapping.get(name);
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
						let globalIndex: any = sourceMapping.get(innerSourceName);
						if (globalIndex === undefined) {
							sourceMapping.set(source, (globalIndex = sourceMapping.size));
							onSource(globalIndex, innerSourceName, innerSource);
						}
						sourceIndexMapping[sourceIndex] = globalIndex;
					}
				}
			}

			const finalSourceIndex: number =
				sourceIndex < 0 || sourceIndex >= sourceIndexMapping.length
					? -1
					: sourceIndexMapping[sourceIndex];
			if (finalSourceIndex < 0) {
				// no source, so we make it a generated chunk
				onChunk(chunk, generatedLine, generatedColumn, -1, -1, -1, -1);
			} else {
				// Pass through the chunk with mapping
				let finalNameIndex: number = -1;
				if (nameIndex >= 0 && nameIndex < nameIndexMapping.length) {
					finalNameIndex = nameIndexMapping[nameIndex];
					if (finalNameIndex === -2) {
						const name: any = nameIndexValueMapping[nameIndex];
						let globalIndex: any = nameMapping.get(name);
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
		(i: number, source: any, sourceContent: any) => {
			if (source === innerSourceName) {
				innerSourceIndex = i;
				if (innerSource !== undefined) sourceContent = innerSource;
				else innerSource = sourceContent;
				sourceIndexMapping[i] = -2;
				streamChunksOfSourceMap(
					sourceContent,
					innerSourceMap,
					(
						chunk: any,
						generatedLine: string,
						generatedColumn: any,
						sourceIndex: number,
						originalLine: any,
						originalColumn: any,
						nameIndex: any
					) => {
						while (innerSourceMapLineData.length < generatedLine) {
							innerSourceMapLineData.push({
								mappingsData: [],
								chunks: []
							});
						}
						const data: any = innerSourceMapLineData[generatedLine - 1];
						data.mappingsData.push(
							generatedColumn,
							sourceIndex,
							originalLine,
							originalColumn,
							nameIndex
						);
						data.chunks.push(chunk);
					},
					(i: number, source: any, sourceContent: any) => {
						innerSourceContents[i] = sourceContent;
						innerSourceContentLines[i] = undefined;
						innerSourceIndexMapping[i] = -2;
						innerSourceIndexValueMapping[i] = [source, sourceContent];
					},
					(i: any, name: any) => {
						innerNameIndexMapping[i] = -2;
						innerNameIndexValueMapping[i] = name;
					},
					false,
					columns
				);
			} else {
				let globalIndex: any = sourceMapping.get(source);
				if (globalIndex === undefined) {
					sourceMapping.set(source, (globalIndex = sourceMapping.size));
					onSource(globalIndex, source, sourceContent);
				}
				sourceIndexMapping[i] = globalIndex;
			}
		},
		(i: any, name: any) => {
			nameIndexMapping[i] = -2;
			nameIndexValueMapping[i] = name;
		},
		finalSource,
		columns
	);
};

export default streamChunksOfCombinedSourceMap;
