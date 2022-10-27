'use strict';

import fs from 'fs';
import jsesc from 'jsesc';
import canonicalProperties from 'unicode-canonical-property-names-ecmascript';

const parsePropertyAliases: Function = function() {
	const map: Map = new Map();
	const source: String = fs.readFileSync('./data/PropertyAliases.txt', 'utf8');
	const lines: Array = source.split('\n');
	for (const line of lines) {
		if (!line || /^#/.test(line)) {
			continue;
		}
		const data: Array = line.trim().split(';');
		const alias1: String = data[0].trim();
		const canonicalName: String = data[1].trim();
		if (!canonicalProperties.has(canonicalName)) {
			continue;
		}
		console.assert(!map.has(alias1));
		map.set(alias1, canonicalName);
		const remaining: Array = data.slice(2);
		for (const otherAliasData of remaining) {
			const otherAlias: String = otherAliasData.trim();
			console.assert(!map.has(otherAlias));
			map.set(otherAlias, canonicalName);
		}
	}
	return map;
};

const map: Array = parsePropertyAliases();
const header: String = '// Generated using `npm run build`. Do not edit!';
const output: String = `${ header }\nmodule.exports = ${
	jsesc(map, {
		'compact': false
	})
};\n`;
require('fs').writeFileSync('./index.js', output);
