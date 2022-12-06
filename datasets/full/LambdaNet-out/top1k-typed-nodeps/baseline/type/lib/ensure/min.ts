"use strict";

var resolveException: Function = require("../resolve-exception");

module.exports = function (value: string, coerced: number, options: object) {
	if (coerced >= options.min) return coerced;
	var errorMessage: string =
		options && options.name
			? "Expected %n to be greater or equal " + options.min + ", received %v"
			: "%v is not greater or equal " + options.min;
	return resolveException(value, errorMessage, options);
};
