"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*: any,  options*/: Object) {
	if (is(value)) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name ? "Expected a promise for %n, received %v" : "%v is not a promise";
	return resolveException(value, errorMessage, options);
};