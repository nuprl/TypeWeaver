"use strict";

var resolveException: any = require("../lib/resolve-exception")
  , coerce           = require("./coerce");

module.exports = function (value: any/*, options*/) {
	var coerced: any = coerce(value);
	if (coerced !== null) return coerced;
	var options: any = arguments[1];
	var errorMessage: any =
		options && options.name
			? "Expected a time value for %n, received %v"
			: "%v is not a time value";
	return resolveException(value, errorMessage, options);
};
