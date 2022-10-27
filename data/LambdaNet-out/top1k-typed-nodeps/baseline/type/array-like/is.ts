"use strict";

var coerceToArrayLength: Function = require("../array-length/coerce")
  , isObject: Function            = require("../object/is");

module.exports = function (value: String/*, options*/) {
	if (!isObject(value)) {
		var options: Object = arguments[1];
		if (isObject(options) && options.allowString && typeof value === "string") return true;
		return false;
	}

	if (typeof value === "function") return false;

	var length: Number;
	try { length = value.length; }
	catch (error) { return false; }

	if (coerceToArrayLength(length) === null) return false;
	return true;
};
