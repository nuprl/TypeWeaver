/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

"use strict";

const ALPHABET: String =
	"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

const CONTINUATION_BIT: Number = 0x20;
const END_SEGMENT_BIT: Number = 0x40;
const NEXT_LINE: Number = END_SEGMENT_BIT | 0x01;
const INVALID: Number = END_SEGMENT_BIT | 0x02;
const DATA_MASK: Number = 0x1f;

const ccToValue: Array = new Uint8Array("z".charCodeAt(0) + 1);
{
	ccToValue.fill(INVALID);
	for (let i = 0; i < ALPHABET.length; i++) {
		ccToValue[ALPHABET.charCodeAt(i)] = i;
	}
	ccToValue[",".charCodeAt(0)] = END_SEGMENT_BIT;
	ccToValue[";".charCodeAt(0)] = NEXT_LINE;
}
const ccMax: Number = ccToValue.length - 1;

/**
 * @param {string} mappings the mappings string
 * @param {function(number, number, number, number, number, number): void} onMapping called for each mapping
 * @returns {void}
 */
const readMappings: Function = (mappings: String, onMapping: Object) => {
	// generatedColumn, [sourceIndex, originalLine, orignalColumn, [nameIndex]]
	const currentData: Object = new Uint32Array([0, 0, 1, 0, 0]);
	let currentDataPos: Number = 0;
	// currentValue will include a sign bit at bit 0
	let currentValue: Number = 0;
	let currentValuePos: Number = 0;
	let generatedLine: Number = 1;
	let generatedColumn: Number = -1;
	for (let i = 0; i < mappings.length; i++) {
		const cc: Number = mappings.charCodeAt(i);
		if (cc > ccMax) continue;
		const value: Number = ccToValue[cc];
		if ((value & END_SEGMENT_BIT) !== 0) {
			// End current segment
			if (currentData[0] > generatedColumn) {
				if (currentDataPos === 1) {
					onMapping(generatedLine, currentData[0], -1, -1, -1, -1);
				} else if (currentDataPos === 4) {
					onMapping(
						generatedLine,
						currentData[0],
						currentData[1],
						currentData[2],
						currentData[3],
						-1
					);
				} else if (currentDataPos === 5) {
					onMapping(
						generatedLine,
						currentData[0],
						currentData[1],
						currentData[2],
						currentData[3],
						currentData[4]
					);
				}
				generatedColumn = currentData[0];
			}
			currentDataPos = 0;
			if (value === NEXT_LINE) {
				// Start new line
				generatedLine++;
				currentData[0] = 0;
				generatedColumn = -1;
			}
		} else if ((value & CONTINUATION_BIT) === 0) {
			// last sextet
			currentValue |= value << currentValuePos;
			const finalValue: Number =
				currentValue & 1 ? -(currentValue >> 1) : currentValue >> 1;
			currentData[currentDataPos++] += finalValue;
			currentValuePos = 0;
			currentValue = 0;
		} else {
			currentValue |= (value & DATA_MASK) << currentValuePos;
			currentValuePos += 5;
		}
	}
	// End current segment
	if (currentDataPos === 1) {
		onMapping(generatedLine, currentData[0], -1, -1, -1, -1);
	} else if (currentDataPos === 4) {
		onMapping(
			generatedLine,
			currentData[0],
			currentData[1],
			currentData[2],
			currentData[3],
			-1
		);
	} else if (currentDataPos === 5) {
		onMapping(
			generatedLine,
			currentData[0],
			currentData[1],
			currentData[2],
			currentData[3],
			currentData[4]
		);
	}
};

module.exports = readMappings;
