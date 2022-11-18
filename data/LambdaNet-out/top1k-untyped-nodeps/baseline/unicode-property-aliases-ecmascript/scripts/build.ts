'use strict';

const fs: string = require('fs');
const jsesc: Function = require('jsesc');
const canonicalProperties: any[] = require('unicode-canonical-property-names-ecmascript');

const parsePropertyAliases: Function = function() {
	const map: Map = new Map();
	const source: string = fs.readFileSync('./data/PropertyAliases.txt', 'utf8');
	const lines: any[] = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data: any[] = line.trim().split(';');
		const alias1: string = data[0].trim();
		const canonicalName: string = data[1].trim();
		if (!canonicalProperties.has(canonicalName)) {
			continue;
		}
		console.assert(!map.has(alias1));
		map.set(alias1, canonicalName);
		const remaining: any[] = data.slice(2);
		for (const otherAliasData of remaining) {
			const otherAlias: string = otherAliasData.trim();
			console.assert(!map.has(otherAlias));
			map.set(otherAlias, canonicalName);
		}
	}
	return map;
};

const map: any[] = parsePropertyAliases();
const header: string = '// Generated using `npm run build`. Do not edit!';
const output: string = `${ header }\nmodule.exports = ${
	jsesc(map, {
		'compact': false
	})
};\n`;
require('fs').writeFileSync('./index.js', output);
