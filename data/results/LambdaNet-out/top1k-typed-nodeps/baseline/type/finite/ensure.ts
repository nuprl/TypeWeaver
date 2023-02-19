"use strict";

var resolveException: Function = require("../lib/resolve-exception")
  , coerce: Function           = require("./coerce");

module.exports = function (value: string/*, options*/) {
	var coerced: boolean = coerce(value);
	if (coerced !== null) return coerced;
	var options: object = arguments[1];
	var errorMessage: string =
		options && options.name
			? "Expected a finite number for %n, received %v"
			: "%v is not a finite number";
	return resolveException(value, errorMessage, options);
};
