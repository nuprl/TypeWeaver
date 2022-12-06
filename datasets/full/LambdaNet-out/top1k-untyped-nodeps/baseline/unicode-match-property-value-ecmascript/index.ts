'use strict';

const propertyToValueAliases: any[] = require('./data/mappings.js');

const matchPropertyValue: Function = function(property: string, value: string) {
	const aliasToValue: Map = propertyToValueAliases.get(property);
	if (!aliasToValue) {
		throw new Error(`Unknown property \`${ property }\`.`);
	}
	const canonicalValue: string = aliasToValue.get(value);
	if (canonicalValue) {
		return canonicalValue;
	}
	throw new Error(
		`Unknown value \`${ value }\` for property \`${ property }\`.`
	);
};

module.exports = matchPropertyValue;
