"use strict";

var coerceToArrayLength: Function = require("../array-length/coerce")
  , isObject: Function            = require("../object/is");

module.exports = function (value: string/*, options*/) {
	if (!isObject(value)) {
		var options: object = arguments[1];
		if (isObject(options) && options.allowString && typeof value === "string") return true;
		return false;
	}

	if (typeof value === "function") return false;

	var length: number;
	try { length = value.length; }
	catch (error) { return false; }

	if (coerceToArrayLength(length) === null) return false;
	return true;
};
