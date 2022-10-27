"use strict";

var resolveException: Function = require("../lib/resolve-exception")
  , coerce: Function           = require("./coerce");

module.exports = function (value: String/*, options*/) {
	var coerced: Boolean = coerce(value);
	if (coerced !== null) return coerced;
	var options: Object = arguments[1];
	var errorMessage: String =
		options && options.name
			? "Expected a finite number for %n, received %v"
			: "%v is not a finite number";
	return resolveException(value, errorMessage, options);
};
