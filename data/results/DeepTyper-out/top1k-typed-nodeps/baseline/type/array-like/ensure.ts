"use strict";

var resolveException: any = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value: any/*, options*/) {
	if (is(value, arguments[1])) return value;
	var options: any = arguments[1];
	var errorMessage: any =
		options && options.name
			? "Expected an array like for %n, received %v"
			: "%v is not an array like";
	return resolveException(value, errorMessage, options);
};
