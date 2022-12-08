/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const ALPHABET: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split(
	""
);

const CONTINUATION_BIT: number = 0x20;

const createMappingsSerializer: boolean = (options: any) => {
	const linesOnly: boolean = options && options.columns === false;
	return linesOnly
		? createLinesOnlyMappingsSerializer()
		: createFullMappingsSerializer();
};

const createFullMappingsSerializer: number = () => {
	let currentLine: number = 1;
	let currentColumn: number = 0;
	let currentSourceIndex: number = 0;
	let currentOriginalLine: number = 1;
	let currentOriginalColumn: number = 0;
	let currentNameIndex: number = 0;
	let activeMapping: boolean = false;
	let activeName: boolean = false;
	let initial: boolean = true;
	return (
		generatedLine: string,
		generatedColumn: number,
		sourceIndex: number,
		originalLine: any,
		originalColumn: any,
		nameIndex: number
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

		let str: string;
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

		const writeValue: void = (value: any) => {
			const sign: number = (value >>> 31) & 1;
			const mask: number = value >> 31;
			const absValue: number = (value + mask) ^ mask;
			let data: number = (absValue << 1) | sign;
			for (;;) {
				const sextet = data & 0x1f;
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

const createLinesOnlyMappingsSerializer: number = () => {
	let lastWrittenLine: number = 0;
	let currentLine: number = 1;
	let currentSourceIndex: number = 0;
	let currentOriginalLine: number = 1;
	return (
		generatedLine: string,
		_generatedColumn: number,
		sourceIndex: number,
		originalLine: string,
		_originalColumn: number,
		_nameIndex: number
	) => {
		if (sourceIndex < 0) {
			// avoid writing generated mappings at all
			return "";
		}
		if (lastWrittenLine === generatedLine) {
			// avoid writing multiple original mappings per line
			return "";
		}
		let str: string;
		const writeValue: void = (value: any) => {
			const sign: number = (value >>> 31) & 1;
			const mask: number = value >> 31;
			const absValue: number = (value + mask) ^ mask;
			let data: number = (absValue << 1) | sign;
			for (;;) {
				const sextet = data & 0x1f;
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
