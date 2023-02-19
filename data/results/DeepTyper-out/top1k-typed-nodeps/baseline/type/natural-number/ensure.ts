"use strict";

var resolveException: any = require("../lib/resolve-exception")
  , ensureMin        = require("../lib/ensure/min")
  , coerce           = require("./coerce");

module.exports = function (value: any/*, options*/) {
	var coerced: any = coerce(value), options = arguments[1];
	if (coerced !== null) {
		if (options) {
			if (options.min) ensureMin(value, coerced, options);
		}
		return coerced;
	}

	var errorMessage: any =
		options && options.name
			? "Expected a natural number for %n, received %v"
			: "%v is not a natural number";
	return resolveException(value, errorMessage, options);
};
