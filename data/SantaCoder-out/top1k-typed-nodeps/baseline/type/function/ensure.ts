"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*: any, options*/: Options) {
	if (is(value)) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected a function for %n, received %v"
			: "%v is not a function";
	return resolveException(value, errorMessage, options);
};