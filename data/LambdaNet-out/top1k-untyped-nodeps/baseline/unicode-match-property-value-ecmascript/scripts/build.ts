'use strict';

const valueAliases: string = require('unicode-property-value-aliases-ecmascript');
const jsesc: Function = require('jsesc');

const propertyToValueAliases: Map = new Map(valueAliases);

for (const [property, values] of valueAliases) {
	for (const [valueAlias, value] of values) {
		values.set(value, value);
	}
}

const output: string = `module.exports = ${
	jsesc(propertyToValueAliases, {
		'compact': false
	})
};\n`;
require('fs').writeFileSync('data/mappings.js', output);
