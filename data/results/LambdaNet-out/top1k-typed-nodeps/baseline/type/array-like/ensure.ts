"use strict";

var resolveException: Function = require("../lib/resolve-exception")
  , is: Function               = require("./is");

module.exports = function (value: string/*, options*/) {
	if (is(value, arguments[1])) return value;
	var options: object = arguments[1];
	var errorMessage: string =
		options && options.name
			? "Expected an array like for %n, received %v"
			: "%v is not an array like";
	return resolveException(value, errorMessage, options);
};
