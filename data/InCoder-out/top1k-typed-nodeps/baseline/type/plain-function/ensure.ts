"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*: Object,  options*/: Object) {
	if (is(value)) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected a plain function for %n, received %v"
			: "%v is not a plain function";
	return resolveException(value, errorMessage, options);
};