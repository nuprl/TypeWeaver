"use strict";

var resolveException: Function = require("../lib/resolve-exception")
  , is: Function               = require("./is");

module.exports = function (value: String/*, options*/) {
	if (is(value)) return value;
	var options: Object = arguments[1];
	var errorMessage: String =
		options && options.name ? "Expected an error for %n, received %v" : "%v is not an error";
	return resolveException(value, errorMessage, options);
};
