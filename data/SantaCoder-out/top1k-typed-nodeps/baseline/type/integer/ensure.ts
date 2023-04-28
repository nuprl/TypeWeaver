"use strict";

var resolveException = require("../lib/resolve-exception")
  , coerce           = require("./coerce");

module.exports = function (value/*: any, options*/: Options) {
	var coerced = coerce(value);
	if (coerced !== null) return coerced;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected an integer for %n, received %v"
			: "%v is not an integer";
	return resolveException(value, errorMessage, options);
};