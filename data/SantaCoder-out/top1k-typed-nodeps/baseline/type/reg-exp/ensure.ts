"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*: any, options*/: Options) {
	if (is(value)) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected a regular expression for %n, received %v"
			: "%v is not a regular expression";
	return resolveException(value, errorMessage, options);
};