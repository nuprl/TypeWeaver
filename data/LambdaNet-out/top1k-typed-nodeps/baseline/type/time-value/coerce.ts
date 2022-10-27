"use strict";

var coerceToInteger: Function = require("../integer/coerce");

var abs: Function = Math.abs;

module.exports = function (value: Number) {
	value = coerceToInteger(value);
	if (!value) return value;
	if (abs(value) > 8.64e15) return null;
	return value;
};
