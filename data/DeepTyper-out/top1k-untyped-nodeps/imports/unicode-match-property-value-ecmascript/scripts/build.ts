'use strict';

const valueAliases: any = require('unicode-property-value-aliases-ecmascript');
const jsesc: any = require('jsesc');

const propertyToValueAliases: any = new Map(valueAliases);

for (const [property, values] of valueAliases) {
	for (const [valueAlias, value] of values) {
		values.set(value, value);
	}
}

const output: any = `module.exports = ${
	jsesc(propertyToValueAliases, {
		'compact': false
	})
};\n`;
require('fs').writeFileSync('data/mappings.js', output);
