'use strict';

const propertyToValueAliases: any = require('./data/mappings.js');

const matchPropertyValue: void = function(property: string, value: string) {
	const aliasToValue: any = propertyToValueAliases.get(property);
	if (!aliasToValue) {
		throw new Error(`Unknown property \`${ property }\`.`);
	}
	const canonicalValue: any = aliasToValue.get(value);
	if (canonicalValue) {
		return canonicalValue;
	}
	throw new Error(
		`Unknown value \`${ value }\` for property \`${ property }\`.`
	);
};

module.exports = matchPropertyValue;
