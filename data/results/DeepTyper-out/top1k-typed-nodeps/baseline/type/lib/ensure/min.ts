"use strict";

var resolveException: any = require("../resolve-exception");

module.exports = function (value: any, coerced: string, options: any) {
	if (coerced >= options.min) return coerced;
	var errorMessage: string =
		options && options.name
			? "Expected %n to be greater or equal " + options.min + ", received %v"
			: "%v is not greater or equal " + options.min;
	return resolveException(value, errorMessage, options);
};
