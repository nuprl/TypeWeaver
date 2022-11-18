"use strict";

var coerceToInteger: Function = require("../integer/coerce");

module.exports = function (value: number) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (value < 0) return null;
	return value;
};
