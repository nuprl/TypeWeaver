/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const ALPHABET: Object = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
	""
);

const CONTINUATION_BIT: Number = 0x20;

const createMappingsSerializer: Function = (options: Object) => {
	const linesOnly: Boolean = options && options.columns === false;
	return linesOnly
		? createLinesOnlyMappingsSerializer()
		: createFullMappingsSerializer();
};

const createFullMappingsSerializer: Function = () => {
	let currentLine: Number = 1;
	let currentColumn: Number = 0;
	let currentSourceIndex: Number = 0;
	let currentOriginalLine: Number = 1;
	let currentOriginalColumn: Number = 0;
	let currentNameIndex: Number = 0;
	let activeMapping: Boolean = false;
	let activeName: Boolean = false;
	let initial: Boolean = true;
	return (
		generatedLine: Number,
		generatedColumn: Number,
		sourceIndex: Number,
		originalLine: Number,
		originalColumn: Number,
		nameIndex: Number
	) => {
		if (activeMapping && currentLine === generatedLine) {
			// A mapping is still active
			if (
				sourceIndex === currentSourceIndex &&
				originalLine === currentOriginalLine &&
				originalColumn === currentOriginalColumn &&
				!activeName &&
				nameIndex < 0
			) {
				// avoid repeating the same original mapping
				return "";
			}
		} else {
			// No mapping is active
			if (sourceIndex < 0) {
				// avoid writing unneccessary generated mappings
				return "";
			}
		}

		let str: String;
		if (currentLine < generatedLine) {
			str = ";".repeat(generatedLine - currentLine);
			currentLine = generatedLine;
			currentColumn = 0;
			initial = false;
		} else if (initial) {
			str = "";
			initial = false;
		} else {
			str = ",";
		}

		const writeValue: Function = (value: Number) => {
			const sign: Number = (value >>> 31) & 1;
			const mask: Number = value >> 31;
			const absValue: Number = (value + mask) ^ mask;
			let data: Number = (absValue << 1) | sign;
			for (;;) {
				const sextet: Number = data & 0x1f;
				data >>= 5;
				if (data === 0) {
					str += ALPHABET[sextet];
					break;
				} else {
					str += ALPHABET[sextet | CONTINUATION_BIT];
				}
			}
		};
		writeValue(generatedColumn - currentColumn);
		currentColumn = generatedColumn;
		if (sourceIndex >= 0) {
			activeMapping = true;
			if (sourceIndex === currentSourceIndex) {
				str += "A";
			} else {
				writeValue(sourceIndex - currentSourceIndex);
				currentSourceIndex = sourceIndex;
			}
			writeValue(originalLine - currentOriginalLine);
			currentOriginalLine = originalLine;
			if (originalColumn === currentOriginalColumn) {
				str += "A";
			} else {
				writeValue(originalColumn - currentOriginalColumn);
				currentOriginalColumn = originalColumn;
			}
			if (nameIndex >= 0) {
				writeValue(nameIndex - currentNameIndex);
				currentNameIndex = nameIndex;
				activeName = true;
			} else {
				activeName = false;
			}
		} else {
			activeMapping = false;
		}
		return str;
	};
};

const createLinesOnlyMappingsSerializer: Function = () => {
	let lastWrittenLine: Number = 0;
	let currentLine: Number = 1;
	let currentSourceIndex: Number = 0;
	let currentOriginalLine: Number = 1;
	return (
		generatedLine: Number,
		_generatedColumn: Number,
		sourceIndex: Number,
		originalLine: Number,
		_originalColumn: OriginalSource,
		_nameIndex: String
	) => {
		if (sourceIndex < 0) {
			// avoid writing generated mappings at all
			return "";
		}
		if (lastWrittenLine === generatedLine) {
			// avoid writing multiple original mappings per line
			return "";
		}
		let str: String;
		const writeValue: Function = (value: Number) => {
			const sign: Number = (value >>> 31) & 1;
			const mask: Number = value >> 31;
			const absValue: Number = (value + mask) ^ mask;
			let data: Number = (absValue << 1) | sign;
			for (;;) {
				const sextet: Number = data & 0x1f;
				data >>= 5;
				if (data === 0) {
					str += ALPHABET[sextet];
					break;
				} else {
					str += ALPHABET[sextet | CONTINUATION_BIT];
				}
			}
		};
		lastWrittenLine = generatedLine;
		if (generatedLine === currentLine + 1) {
			currentLine = generatedLine;
			if (sourceIndex === currentSourceIndex) {
				currentSourceIndex = sourceIndex;
				if (originalLine === currentOriginalLine + 1) {
					currentOriginalLine = originalLine;
					return ";AACA";
				} else {
					str = ";AA";
					writeValue(originalLine - currentOriginalLine);
					currentOriginalLine = originalLine;
					return str + "A";
				}
			} else {
				str = ";A";
				writeValue(sourceIndex - currentSourceIndex);
				currentSourceIndex = sourceIndex;
				writeValue(originalLine - currentOriginalLine);
				currentOriginalLine = originalLine;
				return str + "A";
			}
		} else {
			str = ";".repeat(generatedLine - currentLine);
			currentLine = generatedLine;
			if (sourceIndex === currentSourceIndex) {
				currentSourceIndex = sourceIndex;
				if (originalLine === currentOriginalLine + 1) {
					currentOriginalLine = originalLine;
					return str + "AACA";
				} else {
					str += "AA";
					writeValue(originalLine - currentOriginalLine);
					currentOriginalLine = originalLine;
					return str + "A";
				}
			} else {
				str += "A";
				writeValue(sourceIndex - currentSourceIndex);
				currentSourceIndex = sourceIndex;
				writeValue(originalLine - currentOriginalLine);
				currentOriginalLine = originalLine;
				return str + "A";
			}
		}
	};
};

export default createMappingsSerializer;
