"use strict";

var resolveException: any = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value: any/*, options*/) {
	if (is(value)) return value;
	var options: any = arguments[1];
	var errorMessage: any =
		options && options.name
			? "Expected a plain function for %n, received %v"
			: "%v is not a plain function";
	return resolveException(value, errorMessage, options);
};
