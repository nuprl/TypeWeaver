'use strict';

const fs: any = require('fs');
const jsesc: any = require('jsesc');
const canonicalProperties: any = require('unicode-canonical-property-names-ecmascript');

const parsePropertyAliases: any = function() {
	const map: any = new Map();
	const source: any = fs.readFileSync('./data/PropertyAliases.txt', 'utf8');
	const lines: string[] = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data: string[] = line.trim().split(';');
		const alias1: string = data[0].trim();
		const canonicalName: string = data[1].trim();
		if (!canonicalProperties.has(canonicalName)) {
			continue;
		}
		console.assert(!map.has(alias1));
		map.set(alias1, canonicalName);
		const remaining: string[] = data.slice(2);
		for (const otherAliasData of remaining) {
			const otherAlias: string = otherAliasData.trim();
			console.assert(!map.has(otherAlias));
			map.set(otherAlias, canonicalName);
		}
	}
	return map;
};

const map: any = parsePropertyAliases();
const header: string = '// Generated using `npm run build`. Do not edit!';
const output: string = `${ header }\nmodule.exports = ${
	jsesc(map, {
		'compact': false
	})
};\n`;
require('fs').writeFileSync('./index.js', output);
