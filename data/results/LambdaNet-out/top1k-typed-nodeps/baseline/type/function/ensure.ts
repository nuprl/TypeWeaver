"use strict";

var resolveException: Function = require("../lib/resolve-exception")
  , is: Function               = require("./is");

module.exports = function (value: string/*, options*/) {
	if (is(value)) return value;
	var options: object = arguments[1];
	var errorMessage: string =
		options && options.name
			? "Expected a function for %n, received %v"
			: "%v is not a function";
	return resolveException(value, errorMessage, options);
};
