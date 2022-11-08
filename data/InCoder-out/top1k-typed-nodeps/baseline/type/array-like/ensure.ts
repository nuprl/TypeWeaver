"use strict";

var resolveException = require("../lib/resolve-exception")
  , is               = require("./is");

module.exports = function (value/*: Object,  options*/: Object) {
	if (is(value, arguments[1])) return value;
	var options = arguments[1];
	var errorMessage =
		options && options.name
			? "Expected an array like for %n, received %v"
			: "%v is not an array like";
	return resolveException(value, errorMessage, options);
};