'use strict';

const fs: string = require('fs');
const jsesc: Function = require('jsesc');
const emptyDirSync: Function = require('fs-extra').emptyDirSync;
const regenerate: Function = require('regenerate');
const UNICODE_VERSION: string = '14.0.0';
const unicode: object = require(`@unicode/unicode-${ UNICODE_VERSION }`);

/*----------------------------------------------------------------------------*/

const codePointToString: Function = function(codePoint: string) {
	return '0x' + codePoint.toString(16).toUpperCase();
};

// Regenerate plugin that turns a set into some JavaScript source code that
// generates that set.
regenerate.prototype.toCode = function() {
	const data: any[] = this.data;
	// Iterate over the data per `(start, end)` pair.
	let index: number = 0;
	let start: string;
	let end: number;
	const length: number = data.length;
	const loneCodePoints: any[] = [];
	const ranges: any[] = [];
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
	let output: string = 'const set = require(\'regenerate\')(' + loneCodePoints.join(', ') + ');\n';
	if (ranges.length > 0) {
		let i: number = 0;
		output += 'set';
		// Avoid deeply-nested ASTs.
		// https://github.com/babel/babel/issues/8278
		const MAX_CHAINED_CALLS: number = 50;
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

const nonBinaryProperties: any[] = [
	'General_Category',
	'Script',
	'Script_Extensions',
];

for (const property of nonBinaryProperties) {
	const values: any[] = [];
	// Empty the target directory, or create it if it doesn’t exist yet.
	const directory: string = `${ property }`;
	console.log(`Emptying ${ directory }…`);
	emptyDirSync(directory);
	console.assert(unicode[property], `Property ${ property } not found.`);
	for (const value of unicode[property]) {
		values.push(value);
		const fileName: string = `${ directory }/${ value }.js`;
		console.log(`Creating ${ fileName }…`);
		const codePoints: string = require(
			`@unicode/unicode-${ UNICODE_VERSION }/${ property }/${ value }/code-points.js`
		);
		const set: any[] = regenerate(codePoints);
		const output: string = `${ set.toCode() }\nexports.characters = set;\n`;
		fs.writeFileSync(fileName, output);
	}
	INDEX.set(property, values.sort());
}

/*----------------------------------------------------------------------------*/

const supportedProperties: Map = require('unicode-canonical-property-names-ecmascript');
for (const property of nonBinaryProperties) {
	supportedProperties.delete(property);
}
const binaryProperties: any[] = [...supportedProperties];

// Empty the target directory, or create it if it doesn’t exist yet.
const directory: string = 'Binary_Property';
console.log(`Emptying ${ directory }…`);
emptyDirSync(directory);
for (const property of binaryProperties) {
	const fileName: string = `${ directory }/${ property }.js`;
	console.log(`Creating ${ fileName }…`);
	const codePoints: string = require(
		`@unicode/unicode-${ UNICODE_VERSION }/Binary_Property/${ property }/code-points.js`
	);
	const set: any[] = regenerate(codePoints);
	const output: string = `${ set.toCode() }\nexports.characters = set;\n`;
	fs.writeFileSync(fileName, output);
}

const allBinaryProperties: any[] = binaryProperties.sort();
INDEX.set('Binary_Property', allBinaryProperties);

/*----------------------------------------------------------------------------*/

const propertiesOfStrings: string = [
	'Basic_Emoji',
	'Emoji_Keycap_Sequence',
	'RGI_Emoji_Modifier_Sequence',
	'RGI_Emoji_Flag_Sequence',
	'RGI_Emoji_Tag_Sequence',
	'RGI_Emoji_ZWJ_Sequence',
	'RGI_Emoji',
].sort();

// Empty the target directory, or create it if it doesn’t exist yet.
const posDirectory: string = 'Property_of_Strings';
console.log(`Emptying ${ posDirectory }…`);
emptyDirSync(posDirectory);

for (const property of propertiesOfStrings) {
	const fileName: string = `${ posDirectory }/${ property }.js`;
	console.log(`Creating ${ fileName }…`);
	const rawStrings: string = require(`@unicode/unicode-${ UNICODE_VERSION }/Sequence_Property/${ property }/index.js`);
	const codePoints: any[] = [];
	const strings: any[] = [];
	for (const rawString of rawStrings) {
		if (rawString.length === 1 || (rawString.length === 2 && rawString.codePointAt(0) > 0xFFFF)) {
			codePoints.push(rawString.codePointAt(0));
		} else {
			strings.push(rawString);
		}
	}
	const set: any[] = regenerate(codePoints);
	const output: string = `${ set.toCode() }\nexports.characters = set;\nexports.strings = ${ jsesc(strings, { es6: true }) };\n`;
	fs.writeFileSync(fileName, output);
}
INDEX.set('Property_of_Strings', propertiesOfStrings);

/*----------------------------------------------------------------------------*/

const output: string = `module.exports = ${
	jsesc(INDEX, {
		'compact': false
	})
};\n`;
fs.writeFileSync('index.js', output);

/*----------------------------------------------------------------------------*/

const packageData: any[] = require('./package.json');
const dependencies: any[] = Object.keys(packageData.devDependencies);
const unicodePackage: any[] = dependencies.find((name: string) =>/^@unicode\/unicode-\d/.test(name));
const unicodeVersion: string = unicodePackage.replace(/^@unicode\/unicode-/g, '');
const versionOutput: string = `module.exports = ${
	jsesc(unicodeVersion, {
		'wrap': true
	})
};\n`;
fs.writeFileSync('unicode-version.js', versionOutput);
