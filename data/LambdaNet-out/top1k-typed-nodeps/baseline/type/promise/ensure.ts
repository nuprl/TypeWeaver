"use strict";

var resolveException: Function = require("../lib/resolve-exception")
  , is: Function               = require("./is");

module.exports = function (value: String/*, options*/) {
	if (is(value)) return value;
	var options: Object = arguments[1];
	var errorMessage: String =
		options && options.name ? "Expected a promise for %n, received %v" : "%v is not a promise";
	return resolveException(value, errorMessage, options);
};
