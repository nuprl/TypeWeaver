"use strict";

var resolveException: Function = require("../lib/resolve-exception")
  , ensureMin: Function        = require("../lib/ensure/min")
  , coerce: Function           = require("./coerce");

module.exports = function (value: String/*, options*/) {
	var coerced: Number = coerce(value), options: HTMLElement = arguments[1];
	if (coerced !== null) {
		if (options) {
			if (options.min) ensureMin(value, coerced, options);
		}
		return coerced;
	}

	var errorMessage: String =
		options && options.name
			? "Expected a natural number for %n, received %v"
			: "%v is not a natural number";
	return resolveException(value, errorMessage, options);
};
