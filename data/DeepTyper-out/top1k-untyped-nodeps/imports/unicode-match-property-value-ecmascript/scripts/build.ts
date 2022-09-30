'use strict';

import valueAliases from 'unicode-property-value-aliases-ecmascript';
import jsesc from 'jsesc';

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
