"use strict";

var coerceToFinite: any = require("../finite/coerce");

var abs: number = Math.abs, floor = Math.floor;

module.exports = function (value: number) {
	value = coerceToFinite(value);
	if (!value) return value;
	return (value > 0 ? 1 : -1) * floor(abs(value));
};
