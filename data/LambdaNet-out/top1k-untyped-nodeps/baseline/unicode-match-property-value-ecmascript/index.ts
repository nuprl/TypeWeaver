'use strict';

const propertyToValueAliases: Map = require('./data/mappings.js');

const matchPropertyValue: Function = function(property: String, value: String) {
	const aliasToValue: Map = propertyToValueAliases.get(property);
	if (!aliasToValue) {
		throw new Error(`Unknown property \`${ property }\`.`);
	}
	const canonicalValue: String = aliasToValue.get(value);
	if (canonicalValue) {
		return canonicalValue;
	}
	throw new Error(
		`Unknown value \`${ value }\` for property \`${ property }\`.`
	);
};

module.exports = matchPropertyValue;
