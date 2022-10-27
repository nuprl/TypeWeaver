/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

import Source from './Source';
import RawSource from './RawSource';
import streamChunks from './helpers/streamChunks';
import { getMap, getSourceAndMap } from './helpers/getFromStreamChunks';

const stringsAsRawSources: any = new WeakSet();

class ConcatSource extends Source {
	constructor() {
		super();
		this._children = [];
		for (let i = 0; i < arguments.length; i++) {
			const item: any = arguments[i];
			if (item instanceof ConcatSource) {
				for (const child of item._children) {
					this._children.push(child);
				}
			} else {
				this._children.push(item);
			}
		}
		this._isOptimized = arguments.length === 0;
	}

	getChildren() {
		if (!this._isOptimized) this._optimize();
		return this._children;
	}

	add(item) {
		if (item instanceof ConcatSource) {
			for (const child of item._children) {
				this._children.push(child);
			}
		} else {
			this._children.push(item);
		}
		this._isOptimized = false;
	}

	addAllSkipOptimizing(items) {
		for (const item of items) {
			this._children.push(item);
		}
	}

	buffer() {
		if (!this._isOptimized) this._optimize();
		const buffers: any[] = [];
		for (const child of this._children) {
			if (typeof child.buffer === "function") {
				buffers.push(child.buffer());
			} else {
				const bufferOrString: any = child.source();
				if (Buffer.isBuffer(bufferOrString)) {
					buffers.push(bufferOrString);
				} else {
					// This will not happen
					buffers.push(Buffer.from(bufferOrString, "utf-8"));
				}
			}
		}
		return Buffer.concat(buffers);
	}

	source() {
		if (!this._isOptimized) this._optimize();
		let source: string = "";
		for (const child of this._children) {
			source += child.source();
		}
		return source;
	}

	size() {
		if (!this._isOptimized) this._optimize();
		let size: number = 0;
		for (const child of this._children) {
			size += child.size();
		}
		return size;
	}

	map(options) {
		return getMap(this, options);
	}

	sourceAndMap(options) {
		return getSourceAndMap(this, options);
	}

	streamChunks(options, onChunk, onSource, onName) {
		if (!this._isOptimized) this._optimize();
		if (this._children.length === 1)
			return this._children[0].streamChunks(options, onChunk, onSource, onName);
		let currentLineOffset: number = 0;
		let currentColumnOffset: number = 0;
		let sourceMapping: any = new Map();
		let nameMapping: any = new Map();
		const finalSource: boolean = !!(options && options.finalSource);
		let code: string = "";
		let needToCloseMapping: boolean = false;
		for (const item of this._children) {
			const sourceIndexMapping: any[] = [];
			const nameIndexMapping: any[] = [];
			let lastMappingLine: number = 0;
			const { generatedLine, generatedColumn, source } = streamChunks(
				item,
				options,
				// eslint-disable-next-line no-loop-func
				(
					chunk: any,
					generatedLine: string,
					generatedColumn: number,
					sourceIndex: number,
					originalLine: any,
					originalColumn: any,
					nameIndex: any
				) => {
					const line: any = generatedLine + currentLineOffset;
					const column: any =
						generatedLine === 1
							? generatedColumn + currentColumnOffset
							: generatedColumn;
					if (needToCloseMapping) {
						if (generatedLine !== 1 || generatedColumn !== 0) {
							onChunk(
								undefined,
								currentLineOffset + 1,
								currentColumnOffset,
								-1,
								-1,
								-1,
								-1
							);
						}
						needToCloseMapping = false;
					}
					const resultSourceIndex: number =
						sourceIndex < 0 || sourceIndex >= sourceIndexMapping.length
							? -1
							: sourceIndexMapping[sourceIndex];
					const resultNameIndex: number =
						nameIndex < 0 || nameIndex >= nameIndexMapping.length
							? -1
							: nameIndexMapping[nameIndex];
					lastMappingLine = resultSourceIndex < 0 ? 0 : generatedLine;
					if (finalSource) {
						if (chunk !== undefined) code += chunk;
						if (resultSourceIndex >= 0) {
							onChunk(
								undefined,
								line,
								column,
								resultSourceIndex,
								originalLine,
								originalColumn,
								resultNameIndex
							);
						}
					} else {
						if (resultSourceIndex < 0) {
							onChunk(chunk, line, column, -1, -1, -1, -1);
						} else {
							onChunk(
								chunk,
								line,
								column,
								resultSourceIndex,
								originalLine,
								originalColumn,
								resultNameIndex
							);
						}
					}
				},
				(i: number, source: any, sourceContent: any) => {
					let globalIndex: any = sourceMapping.get(source);
					if (globalIndex === undefined) {
						sourceMapping.set(source, (globalIndex = sourceMapping.size));
						onSource(globalIndex, source, sourceContent);
					}
					sourceIndexMapping[i] = globalIndex;
				},
				(i: number, name: any) => {
					let globalIndex: any = nameMapping.get(name);
					if (globalIndex === undefined) {
						nameMapping.set(name, (globalIndex = nameMapping.size));
						onName(globalIndex, name);
					}
					nameIndexMapping[i] = globalIndex;
				}
			);
			if (source !== undefined) code += source;
			if (needToCloseMapping) {
				if (generatedLine !== 1 || generatedColumn !== 0) {
					onChunk(
						undefined,
						currentLineOffset + 1,
						currentColumnOffset,
						-1,
						-1,
						-1,
						-1
					);
					needToCloseMapping = false;
				}
			}
			if (generatedLine > 1) {
				currentColumnOffset = generatedColumn;
			} else {
				currentColumnOffset += generatedColumn;
			}
			needToCloseMapping =
				needToCloseMapping ||
				(finalSource && lastMappingLine === generatedLine);
			currentLineOffset += generatedLine - 1;
		}
		return {
			generatedLine: currentLineOffset + 1,
			generatedColumn: currentColumnOffset,
			source: finalSource ? code : undefined
		};
	}

	updateHash(hash) {
		if (!this._isOptimized) this._optimize();
		hash.update("ConcatSource");
		for (const item of this._children) {
			item.updateHash(hash);
		}
	}

	_optimize() {
		const newChildren: any[] = [];
		let currentString: any = undefined;
		let currentRawSources: any = undefined;
		const addStringToRawSources: string = string => {
			if (currentRawSources === undefined) {
				currentRawSources = string;
			} else if (Array.isArray(currentRawSources)) {
				currentRawSources.push(string);
			} else {
				currentRawSources = [
					typeof currentRawSources === "string"
						? currentRawSources
						: currentRawSources.source(),
					string
				];
			}
		};
		const addSourceToRawSources: any = (source: any) => {
			if (currentRawSources === undefined) {
				currentRawSources = source;
			} else if (Array.isArray(currentRawSources)) {
				currentRawSources.push(source.source());
			} else {
				currentRawSources = [
					typeof currentRawSources === "string"
						? currentRawSources
						: currentRawSources.source(),
					source.source()
				];
			}
		};
		const mergeRawSources: void = () => {
			if (Array.isArray(currentRawSources)) {
				const rawSource: any = new RawSource(currentRawSources.join(""));
				stringsAsRawSources.add(rawSource);
				newChildren.push(rawSource);
			} else if (typeof currentRawSources === "string") {
				const rawSource: any = new RawSource(currentRawSources);
				stringsAsRawSources.add(rawSource);
				newChildren.push(rawSource);
			} else {
				newChildren.push(currentRawSources);
			}
		};
		for (const child of this._children) {
			if (typeof child === "string") {
				if (currentString === undefined) {
					currentString = child;
				} else {
					currentString += child;
				}
			} else {
				if (currentString !== undefined) {
					addStringToRawSources(currentString);
					currentString = undefined;
				}
				if (stringsAsRawSources.has(child)) {
					addSourceToRawSources(child);
				} else {
					if (currentRawSources !== undefined) {
						mergeRawSources();
						currentRawSources = undefined;
					}
					newChildren.push(child);
				}
			}
		}
		if (currentString !== undefined) {
			addStringToRawSources(currentString);
		}
		if (currentRawSources !== undefined) {
			mergeRawSources();
		}
		this._children = newChildren;
		this._isOptimized = true;
	}
}

export default ConcatSource;
