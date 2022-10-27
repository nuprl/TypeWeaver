'use strict';

import fs from 'fs';
import jsesc from 'jsesc';
import { emptyDirSync } from 'fs-extra';
import regenerate from 'regenerate';
const UNICODE_VERSION: String = '14.0.0';
const unicode: Object = require(`@unicode/unicode-${ UNICODE_VERSION }`);

/*----------------------------------------------------------------------------*/

const codePointToString: Function = function(codePoint: String) {
	return '0x' + codePoint.toString(16).toUpperCase();
};

// Regenerate plugin that turns a set into some JavaScript source code that
// generates that set.
regenerate.prototype.toCode = function() {
	const data: Array = this.data;
	// Iterate over the data per `(start, end)` pair.
	let index: Number = 0;
	let start: String;
	let end: Number;
	const length: Number = data.length;
	const loneCodePoints: Array = [];
	const ranges: Array = [];
	while (index < length) {
		start = data[index];
		end = data[index + 1] - 1; // Note: the `- 1` makes `end` inclusive.
		if (start == end) {
			loneCodePoints.push(codePointToString(start));
		} else {
			ranges.push(
				'addRange(' + codePointToString(start) +
				', ' + codePointToString(end) + ')'
			);
		}
		index += 2;
	}
	let output: String = 'const set = require(\'regenerate\')(' + loneCodePoints.join(', ') + ');\n';
	if (ranges.length > 0) {
		let i: Number = 0;
		output += 'set';
		// Avoid deeply-nested ASTs.
		// https://github.com/babel/babel/issues/8278
		const MAX_CHAINED_CALLS: Number = 50;
		for (const range of ranges) {
			if (i++ == MAX_CHAINED_CALLS) {
				i = 0;
				output += '.' + range + ';\nset';
			} else {
				output += '.' + range;
			}
		}
		output += ';';
	}
	return output;
};

const INDEX: Map = new Map();

/*----------------------------------------------------------------------------*/

const nonBinaryProperties: Array = [
	'General_Category',
	'Script',
	'Script_Extensions',
];

for (const property of nonBinaryProperties) {
	const values: Array = [];
	// Empty the target directory, or create it if it doesn’t exist yet.
	const directory: String = `${ property }`;
	console.log(`Emptying ${ directory }…`);
	emptyDirSync(directory);
	console.assert(unicode[property], `Property ${ property } not found.`);
	for (const value of unicode[property]) {
		values.push(value);
		const fileName: String = `${ directory }/${ value }.js`;
		console.log(`Creating ${ fileName }…`);
		const codePoints: String = require(
			`@unicode/unicode-${ UNICODE_VERSION }/${ property }/${ value }/code-points.js`
		);
		const set: Array = regenerate(codePoints);
		const output: String = `${ set.toCode() }\nexports.characters = set;\n`;
		fs.writeFileSync(fileName, output);
	}
	INDEX.set(property, values.sort());
}

/*----------------------------------------------------------------------------*/

import supportedProperties from 'unicode-canonical-property-names-ecmascript';

for (const property of nonBinaryProperties) {
	supportedProperties.delete(property);
}
const binaryProperties: Array = [...supportedProperties];

// Empty the target directory, or create it if it doesn’t exist yet.
const directory: String = 'Binary_Property';
console.log(`Emptying ${ directory }…`);
emptyDirSync(directory);
for (const property of binaryProperties) {
	const fileName: String = `${ directory }/${ property }.js`;
	console.log(`Creating ${ fileName }…`);
	const codePoints: String = require(
		`@unicode/unicode-${ UNICODE_VERSION }/Binary_Property/${ property }/code-points.js`
	);
	const set: Array = regenerate(codePoints);
	const output: String = `${ set.toCode() }\nexports.characters = set;\n`;
	fs.writeFileSync(fileName, output);
}

const allBinaryProperties: Array = binaryProperties.sort();
INDEX.set('Binary_Property', allBinaryProperties);

/*----------------------------------------------------------------------------*/

const propertiesOfStrings: String = [
	'Basic_Emoji',
	'Emoji_Keycap_Sequence',
	'RGI_Emoji_Modifier_Sequence',
	'RGI_Emoji_Flag_Sequence',
	'RGI_Emoji_Tag_Sequence',
	'RGI_Emoji_ZWJ_Sequence',
	'RGI_Emoji',
].sort();

// Empty the target directory, or create it if it doesn’t exist yet.
const posDirectory: String = 'Property_of_Strings';
console.log(`Emptying ${ posDirectory }…`);
emptyDirSync(posDirectory);

for (const property of propertiesOfStrings) {
	const fileName: String = `${ posDirectory }/${ property }.js`;
	console.log(`Creating ${ fileName }…`);
	const rawStrings: String = require(`@unicode/unicode-${ UNICODE_VERSION }/Sequence_Property/${ property }/index.js`);
	const codePoints: Array = [];
	const strings: Array = [];
	for (const rawString of rawStrings) {
		if (rawString.length === 1 || (rawString.length === 2 && rawString.codePointAt(0) > 0xFFFF)) {
			codePoints.push(rawString.codePointAt(0));
		} else {
			strings.push(rawString);
		}
	}
	const set: Array = regenerate(codePoints);
	const output: String = `${ set.toCode() }\nexports.characters = set;\nexports.strings = ${ jsesc(strings, { es6: true }) };\n`;
	fs.writeFileSync(fileName, output);
}
INDEX.set('Property_of_Strings', propertiesOfStrings);

/*----------------------------------------------------------------------------*/

const output: String = `module.exports = ${
	jsesc(INDEX, {
		'compact': false
	})
};\n`;
fs.writeFileSync('index.js', output);

/*----------------------------------------------------------------------------*/

import packageData from './package.json';

const dependencies: Array = Object.keys(packageData.devDependencies);
const unicodePackage: Array = dependencies.find((name: String) =>/^@unicode\/unicode-\d/.test(name));
const unicodeVersion: String = unicodePackage.replace(/^@unicode\/unicode-/g, '');
const versionOutput: String = `module.exports = ${
	jsesc(unicodeVersion, {
		'wrap': true
	})
};\n`;
fs.writeFileSync('unicode-version.js', versionOutput);
