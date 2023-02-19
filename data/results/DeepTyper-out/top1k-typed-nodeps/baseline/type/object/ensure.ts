"use strict";

var resolveException: any = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value: any/*, options*/) {
	if (is(value)) return value;
	var options: any = arguments[1];
	var errorMessage: any =
		options && options.name ? "Expected an object for %n, received %v" : "%v is not an object";
	return resolveException(value, errorMessage, options);
};
