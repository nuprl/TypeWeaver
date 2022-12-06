/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
"use strict";

const Source: any = require("./Source");
const RawSource: any = require("./RawSource");
const streamChunks: any = require("./helpers/streamChunks");
const { getMap, getSourceAndMap } = require("./helpers/getFromStreamChunks");

const REPLACE_REGEX: RegExp = /\n(?=.|\s)/g;

class PrefixSource extends Source {
	constructor(prefix, source) {
		super();
		this._source =
			typeof source === "string" || Buffer.isBuffer(source)
				? new RawSource(source, true)
				: source;
		this._prefix = prefix;
	}

	getPrefix() {
		return this._prefix;
	}

	original() {
		return this._source;
	}

	source() {
		const node: string = this._source.source();
		const prefix: string = this._prefix;
		return prefix + node.replace(REPLACE_REGEX, "\n" + prefix);
	}

	// TODO efficient buffer() implementation

	map(options) {
		return getMap(this, options);
	}

	sourceAndMap(options) {
		return getSourceAndMap(this, options);
	}

	streamChunks(options, onChunk, onSource, onName) {
		const prefix: string = this._prefix;
		const prefixOffset: number = prefix.length;
		const linesOnly: boolean = !!(options && options.columns === false);
		const { generatedLine, generatedColumn, source } = streamChunks(
			this._source,
			options,
			(
				chunk: any,
				generatedLine: string,
				generatedColumn: number,
				sourceIndex: number,
				originalLine: any,
				originalColumn: any,
				nameIndex: number
			) => {
				if (generatedColumn !== 0) {
					// In the middle of the line, we just adject the column
					generatedColumn += prefixOffset;
				} else if (chunk !== undefined) {
					// At the start of the line, when we have source content
					// add the prefix as generated mapping
					// (in lines only mode we just add it to the original mapping
					// for performance reasons)
					if (linesOnly || sourceIndex < 0) {
						chunk = prefix + chunk;
					} else if (prefixOffset > 0) {
						onChunk(prefix, generatedLine, generatedColumn, -1, -1, -1, -1);
						generatedColumn += prefixOffset;
					}
				} else if (!linesOnly) {
					// Without source content, we only need to adject the column info
					// expect in lines only mode where prefix is added to original mapping
					generatedColumn += prefixOffset;
				}
				onChunk(
					chunk,
					generatedLine,
					generatedColumn,
					sourceIndex,
					originalLine,
					originalColumn,
					nameIndex
				);
			},
			onSource,
			onName
		);
		return {
			generatedLine,
			generatedColumn:
				generatedColumn === 0 ? 0 : prefixOffset + generatedColumn,
			source:
				source !== undefined
					? prefix + source.replace(REPLACE_REGEX, "\n" + prefix)
					: undefined
		};
	}

	updateHash(hash) {
		hash.update("PrefixSource");
		this._source.updateHash(hash);
		hash.update(this._prefix);
	}
}

module.exports = PrefixSource;
